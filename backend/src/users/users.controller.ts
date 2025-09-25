import { Controller, Post, Body,Get } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dtos/create-users.dto';
import { LoginDto } from './dtos/login.dto';
import { UsersService } from './user.service';
import { UserAuthService } from './user.auth.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly UserAuthService: UserAuthService ,
    private readonly userService: UsersService,
  ) {}

  // Signup - delegate to UserAuthService
  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    // UserAuthService will create the user and return relevant data (e.g. token or user info)
    return this.UserAuthService.signup(body.email,body.password,body.username,body.phone,body.role,body.address);
  }

  // Login - delegate to UserAuthService
  @Post('signin')
  async login(@Body() body: LoginDto) {
    return this.UserAuthService.signin(body.email,body.password);
  }
    
  @Get()
  test(){
    return this.userService.hello()
  }
  

//   // Protected route - get user profile
//   @UseGuards(JwtAuthGuard)
//   @Get('profile')
//   async getProfile(@Req() req) {
//     return this.userService.findById(req.user.userId);
//   }

//   // Protected route - update user details
 
}
