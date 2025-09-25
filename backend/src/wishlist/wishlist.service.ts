import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'users/users.entity';
import { Product } from 'products/products.entity';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@Injectable()
@UseGuards(JwtAuthGuard)
export class WishlistService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async getWishlist(userId: string): Promise<Product[]> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['wishlist'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.wishlist;
  }

  async addProductToWishlist(userId: string, productId: number): Promise<Product[]> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['wishlist'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Avoid duplicates
    if (!user.wishlist.find(p => p.id === product.id)) {
      user.wishlist.push(product);
      await this.userRepo.save(user);
    }

    return user.wishlist;
  }
  
    async removeProductFromWishlist(userId: string, productId: number): Promise<Product[]> {
    const user = await this.userRepo.findOne({
        where: { id: userId },
        relations: ['wishlist'],
    });
    if (!user) {
        throw new NotFoundException('User not found');
    }

    const initialLength = user.wishlist.length;
    user.wishlist = user.wishlist.filter(p => p.id !== productId);

    if (user.wishlist.length === initialLength) {
        throw new NotFoundException('Product not in wishlist');
    }

    await this.userRepo.save(user);

    return user.wishlist;
    }

}
