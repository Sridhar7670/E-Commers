import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'users/users.entity';
import { Product } from 'products/products.entity';


@Module({
  imports:[
  TypeOrmModule.forFeature([User,Product]),],
  providers: [WishlistService],
  controllers: [WishlistController]
})
export class WishlistModule {}
