import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { AdminService } from 'admin/admin.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly adminservice:AdminService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('AllProducts')
  Allproducts(){
    return this.adminservice.findAll( )
  }
  @Get('products/category/:category')
  findProductsByCategory(@Param('category') category: string) {
    // console.log("Products/category route is running")
  return this.adminservice.findProductsByCategory(category);
}
  @Get('product/:id')
  oneproducts( @Param('id') id: string,){
    return this.adminservice.findProductByid(+id)
  }
}
