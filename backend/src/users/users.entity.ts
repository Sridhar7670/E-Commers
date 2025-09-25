import { Cart } from 'cart/cart.entity';
import { Product } from 'products/products.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinTable, JoinColumn, ManyToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ default: 'user' }) // other roles: admin, seller, etc.
  role: string;

  @OneToOne(()=>Cart,cart=>cart.user,{cascade:true})
  @JoinColumn()
  cart:Cart;

  @ManyToMany(()=>Product)
  @JoinTable({name:'user_wishlist_products'})
  wishlist:Product[]
  

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 
