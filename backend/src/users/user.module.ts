import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./users.controller";
import { UsersService } from "./user.service";
import { UserAuthService } from "./user.auth.service";
import { User } from "./users.entity";
import { AuthModule } from "../auth/auth.module";
import { AdminService } from "admin/admin.service";
import { adminModule } from "admin/admin.module";
import { Product } from "products/products.entity";


@Module({
    imports:[TypeOrmModule.forFeature([User,Product]),AuthModule,adminModule],
    controllers:[UserController],
    providers:[UsersService,UserAuthService,AdminService]
    //    { provide:APP_INTERCEPTOR,
    //     useClass: CurrentUserInterceptor}]   //Globally Scoped Interceptor 
})
export class userModule{}