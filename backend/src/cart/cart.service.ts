import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { Product } from '../products/products.entity';
import { User } from 'users/users.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>,
   @InjectRepository(Product) private productrepo:Repository<Product>, 
  ) {}


  
  async getCart(userId: string): Promise<Cart> {
    let cart = await this.cartRepo.findOne({
      where: { user: { id: userId } },  // Find cart by user id, 
      relations: ['items', 'items.product'], // load items & their products in array format like [1,'somename']
    });

    // If no cart exists, create a new one
    if (!cart) {
      cart = this.cartRepo.create({ user: { id: userId } as any, items: [] });
      await this.cartRepo.save(cart);
    }

    return cart;
  }

  async addProductToCart(userId: string, productId: number, quantity: number=1): Promise<Cart> {
      const cart = await this.getCart(userId);

      const product = await this.productrepo.findOne({ where: { id: productId } });
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      let cartItem = await this.cartItemRepo.findOne({
        where: { cart: { id: cart.id }, product: { id: productId } },
      });
        if (quantity < 0) {
        throw new BadRequestException('Quantity cannot be negative');
      }
      if (cartItem) {
        cartItem.quantity += +quantity;
      } else {
        cartItem = this.cartItemRepo.create({ cart, product, quantity });
      }

      await this.cartItemRepo.save(cartItem);

      // Return updated cart with relations loaded
      return this.getCart(userId);
  }

  async ReduceProductQuantity(userId: string,productId: number,quantity: number=-1,): Promise<Cart> {
  const cart = await this.getCart(userId);

  const cartItem = await this.cartItemRepo.findOne({
    where: {
      cart: { id: cart.id },
      product: { id: productId },
    },
  });

  if (!cartItem) {
    throw new NotFoundException('Product not in cart');
  }
  const reduction = quantity === -1 ? 1 : quantity;

  if (reduction <= 0) {
    throw new BadRequestException('Reduction quantity must be greater than 0');
  }

  if (cartItem.quantity <= reduction) {
    await this.cartItemRepo.remove(cartItem);
  } else {
    cartItem.quantity -= reduction;
    await this.cartItemRepo.save(cartItem);
  }

  return this.getCart(userId);
  }

  async removeProductFromCart(userId: string, productId: number): Promise<Cart> {
  const cart = await this.getCart(userId);
  const cartItem = await this.cartItemRepo.findOne({
  where: { cart: { id: cart.id }, product: { id: productId } },
  });

  if (!cartItem) {
  throw new NotFoundException('Product not in cart');
  }

  await this.cartItemRepo.remove(cartItem);
  return this.getCart(userId);
  }

}
