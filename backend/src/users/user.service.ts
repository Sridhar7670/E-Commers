import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Find user by email
  async find(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  //find by phone number 
  async findByPhone(phone: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { phone } });
  } 

  // Create new user
  async create(email: string,password: string,username: string,phone: string,role:string,address?: string): Promise<User> {
    const user = this.userRepository.create({ email, password, name: username ,phone,role,address});
    return this.userRepository.save(user);
  }
  hello(){
    return "hi from user service"
  }
}


