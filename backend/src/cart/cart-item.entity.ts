import { Product } from "../products/products.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity()
export class CartItem{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>Product)
    product:Product;
    
    @Column()
    quantity:number;

    @ManyToOne(()=>Cart,cart=>cart.items)
    cart:Cart
}