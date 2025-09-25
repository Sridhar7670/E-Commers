import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../products/dtos/create-product.dto';
import { UpdateProductDto } from '../products/dtos/update-products.dto';
import { Product } from '../products/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Product)
    private productRepo:Repository<Product>
  ){

  }
  //random testing
  getHello(): string {
    return 'Hello World!';
  }
  //creating product 

  // async createProd(Productname: string,Productdescription: string,price: number,brand:string ,imageUrl?:string,inStock?:boolean): Promise<any> {
  //  const product = this.productRepo.create({ Productname,Productdescription,price,brand,imageUrl,inStock})
  //  return this.productRepo.save(product)
  // }
  //crete product
  async createProd(productdata:CreateProductDto): Promise<any> {
   const product = this.productRepo.create(productdata)
   await this.productRepo.save(product)
   return 'Product With Details Added to Db'
  }
  //Update product
  async UpdateProd(id:number,updateProdData:UpdateProductDto):Promise<any>{
    const product= await this.productRepo.findOne({where:{id}})
    if(!product){
      throw new NotFoundException(`Product with ${id} not found`)
    }
    await this.productRepo.update(id,updateProdData);
    return `product with id :${id} updated sucessfully`
  }
  //delete product
  async delete(id:number):Promise<any>{
    const product= await this.productRepo.findOne({where:{id}})
    if(!product){
      throw new NotFoundException(`Product with ${id} not found`)
    }
    await this.productRepo.delete(id)
    return `product with ${id} deleted sucessfully`
  }
  async findAll():Promise<any>{
    const Allproducts = await this.productRepo.find() 
    return Allproducts;
  }
  async findProductByid(id:number):Promise<any>{
    const product= await this.productRepo.findOne({where :{id}})
    if(!product){
      throw new NotFoundException(`Product with ${id} not found`)
    }
    return product;
  }
  async findProductsByCategory(category:string) :Promise<any>{
    return this.productRepo.find({
      where :{
        category :category     //finding by category
      }
    })
  }

}