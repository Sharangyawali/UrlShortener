import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  imports:[JwtModule.register({
    global:true,
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn:"24h" },
  }),PassportModule],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy,JwtAuthGuard],
  exports:[PassportModule,JwtStrategy,JwtAuthGuard]
})
export class AuthModule {}
