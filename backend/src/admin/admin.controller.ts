import { Controller, Get, UseGuards,Request, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductDto } from '../products/dtos/create-product.dto';
import { UpdateProductDto } from '../products/dtos/update-products.dto';

@UseGuards(JwtAuthGuard)
@Controller('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getHello() {
    return this.adminService.getHello();
  }
  @Get('profile')
  getProfile(@Request() req) {
    // console.log(req.user,"hiii")
    return req.user; // Contains the payload returned from JwtStrategy's validate method
  } 
 
  @Post('CreateProduct')
  CreateProduct(@Body() body:CreateProductDto){
    return this.adminService.createProd(body)
  }
  @Put('UpdateProduct/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.adminService.UpdateProd(+id, updateProductDto);
  }
  @Delete('DeleteProduct/:id')
  deleteProduct(@Param('id') id: string) {
    return this.adminService.delete(+id);
  }
  
}