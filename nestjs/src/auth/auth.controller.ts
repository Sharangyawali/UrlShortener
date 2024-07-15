import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDetailDto } from './dto/login-dto';
import { Request,Response } from 'express';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() registerDetail: registerDetailDto) {
    const dublicate = await this.authService.checkDublication(
      registerDetail['email'],
    );
    if (dublicate)
      throw new HttpException(
        {
          success: false,
          message: 'Account already exists',
        },
        HttpStatus.CONFLICT,
      );
    const newUser = await this.authService.createUser(registerDetail);
    if (newUser === null)
      throw new HttpException(
        { success: false, message: 'Internal Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return {
      success: true,
      message: 'Successfully registered',
      data: newUser,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Req() req: Request,@Res() res:Response): Promise<any> {
    return this.authService.login(req.user,res);
  }


}
