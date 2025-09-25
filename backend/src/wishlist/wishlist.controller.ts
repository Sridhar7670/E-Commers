import { Controller, Get, Post, Delete, Param, Request, UseGuards, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  async getWishlist(@Request() req) {
    return this.wishlistService.getWishlist(req.user.id);
  }

  @Post('/:productId')
  async addProduct(
    @Request() req,
    @Param('productId') productId: number,
  ) {
    return this.wishlistService.addProductToWishlist(req.user.id, productId);
  }

  @Delete('/:productId')
  async removeProduct(
    @Request() req,
    @Param('productId',ParseIntPipe) productId: number,
  ) {
    return this.wishlistService.removeProductFromWishlist(req.user.id, productId);
  }
}
