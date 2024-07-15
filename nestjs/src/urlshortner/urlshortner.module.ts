import { Module } from '@nestjs/common';
import { UrlshortnerController } from './urlshortner.controller';
import { UrlshortnerService } from './urlshortner.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[AuthModule],
  controllers: [UrlshortnerController],
  providers: [UrlshortnerService]
})
export class UrlshortnerModule {}
