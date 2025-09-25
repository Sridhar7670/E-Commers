import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../products/products.entity";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";



@Module({
    imports:[TypeOrmModule.forFeature([Product])],
    controllers:[AdminController],
    providers:[AdminService]
    //    { provide:APP_INTERCEPTOR,
    //     useClass: CurrentUserInterceptor}]   //Globally Scoped Interceptor 
})
export class adminModule{}