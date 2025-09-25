import { Module } from '@nestjs/common';
import{TypeOrmModule} from '@nestjs/typeorm'
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { Product } from '../products/products.entity';

@Module({
  imports:[
  TypeOrmModule.forFeature([Cart, CartItem,Product]),],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
