import { JwtService } from "@nestjs/jwt";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { UsersService } from "./user.service";
const scrypt=promisify(_scrypt);

@Injectable()
export class UserAuthService{
    constructor(private usersService:UsersService,
        private jwtService:JwtService ){}

    async signup(email: string, password: string, username: string, phone: string, role:string,address?: string) {
        const existingByEmail = await this.usersService.find(email);
        if (existingByEmail) {
            throw new BadRequestException('Email is already in use');
        }

        const existingByPhone = await this.usersService.findByPhone(phone);
        if (existingByPhone) {
            throw new BadRequestException('Phone number is already in use');
        }

        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const encrypted_pass = `${salt}.${hash.toString('hex')}`;

        const user = await this.usersService.create(email, encrypted_pass, username, phone,role ,address);
        // const user1=JSON.stringify(user)
        // return {user1} ;
        return  user;
    }



    async signin(email: string, password: string) {
    const user = await this.usersService.find(email);
    if (!user) {
        throw new NotFoundException('User not found');
    }
    const [salt, storedhash] = user.password.split(".");
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedhash !== hash.toString('hex')) {
        throw new BadRequestException('Password Incorrect');
    }
    const payload = { id:user.id,email: user.email, phone: user.phone ,name:user.name};

    // console.log(payload,"admin service")
    const token = this.jwtService.sign(payload);
    
    return {
        access_token: token,
    };

    }
}