import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaDbService } from 'src/prisma-db/prisma-db.service';
import { loginDetailsDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import {Response} from "express"
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  saltRounds: number = 10;

  constructor(
    private prismaDbService: PrismaDbService,
    private jwtService: JwtService,
  ) {}
  async checkDublication(email: string) {
    return await this.prismaDbService.user.findUnique({
      where: { email },
    });
  }

  async validateUser(email:string,password:string):Promise<any>{
    const user = await this.prismaDbService.user.findUnique({
      where: {
        email,
      },
    });
    if (!user)
      throw new HttpException({success:false,message:'Account does not exists'},HttpStatus.UNAUTHORIZED);
    const match= await bcrypt.compare(password, user.password);
    if(match===true)
      return user
    else  throw new HttpException({success:false,message:'Please enter correct details'},HttpStatus.UNAUTHORIZED)
  }

  async createUser(detail: Prisma.UserCreateInput) {
    try {
      const hashedPassword = await bcrypt.hash(
        detail.password,
        this.saltRounds,
      );
      console.log(hashedPassword);
      detail.password=hashedPassword;
      const { password, id, ...newUser } =
        await this.prismaDbService.user.create({
          data: detail,
        });
      return newUser;
    } catch (error) {
      return null;
    }
  }

  async login(user:any,res:Response) {
        try {
            const payload = { userId: user.id };
            const token = await this.jwtService.signAsync(payload);
            const expiry = new Date();
            console.log(expiry);
            expiry.setDate(expiry.getDate()+1)
            return res.json({
              success: true,
              message: 'Login successfull',
              data: {
                token: token,
                expiresIn: expiry.toLocaleString(),
              },
            })
        } catch (error) {
            throw new HttpException({
            success:false,
            message:'Internal Error'
            },HttpStatus.INTERNAL_SERVER_ERROR)
        }
  }


}
