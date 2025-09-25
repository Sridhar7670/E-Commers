import { Controller, Delete, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';


@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
   constructor(private cartSerivce:CartService){}

   @Get()
   get_Cart(@Request() req) {
   return this.cartSerivce.getCart(req.user.id);
   }

   @Post('/add/:product_id')
   async AddprodtoCart(@Request() req,
   @Param('product_id') productId:number,
    @Query('quantity') quantity?:number
   ){
      const id=await  req.user.id
      const qty=quantity ?? +1;
      console.log(id)
      return this.cartSerivce.addProductToCart(id,productId,qty)
   }

   @Post('/reduce/:Product_id')
   async reduceProd(
   @Request() req,
   @Param('Product_id') productId: number,
   @Query('quantity') quantity?: number,
   ) {
   const userId = req.user.id;
   const qty = quantity ?? -1; // default to reduce by 1
   return this.cartSerivce.ReduceProductQuantity(userId, productId, qty);
   }

   @Delete('/:productId')
   async removeProductFromCart(
   @Request() req,
   @Param('productId') productId: number,
   ) {
   const userId = req.user.id;
   return this.cartSerivce.removeProductFromCart(userId, productId);
   }


}
