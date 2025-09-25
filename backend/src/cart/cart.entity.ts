import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "users/users.entity";
import { CartItem } from "./cart-item.entity";

@Entity()
export class Cart{
    @PrimaryGeneratedColumn()
    id:number;

    @OneToOne(()=>User, user=>user.cart)
    user:User;

   @OneToMany(() => CartItem, cartitem => cartitem.cart, { cascade: true })
    items: CartItem[];
}