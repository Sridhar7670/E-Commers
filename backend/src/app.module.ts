import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userModule } from './users/user.module';
import { adminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { Product } from 'products/products.entity';
import { AdminService } from 'admin/admin.service';
import { WishlistModule } from './wishlist/wishlist.module';
import { CartModule } from './cart/cart.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    userModule,  
    adminModule,  
    AuthModule, 
    WishlistModule,
    CartModule,
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const portStr = configService.get<string>('DB_PORT');
        
        if (!portStr) {
          throw new Error('DB_PORT environment variable is not set');
        }

        const dbType = configService.get<string>('DB_TYPE') || 'mysql';
          if (!['postgres', 'mysql', 'sqlite'].includes(dbType)) {
            throw new Error(`Unsupported DB_TYPE: ${dbType}`);
          }

        return {
          type: dbType as 'postgres' | 'mysql' | 'sqlite',
          host: configService.get<string>('DB_HOST') || 'localhost',
          port: parseInt(portStr, 10),
          username: configService.get<string>('DB_USERNAME') || 'myuser',
          password: configService.get<string>('DB_PASSWORD') || 'root',
          database: configService.get<string>('DB_NAME') || 'mydb',
          entities: [__dirname + '/**/*.entity{.ts,.js}'], 
          synchronize: true, 
        };
      },
    }),

  ],
  controllers: [AppController],
  providers: [AppService,AdminService],
})
export class AppModule {}

