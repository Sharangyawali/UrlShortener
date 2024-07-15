import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaDbModule } from './prisma-db/prisma-db.module';
import { UrlshortnerModule } from './urlshortner/urlshortner.module';

@Module({
  imports: [AuthModule, PrismaDbModule, UrlshortnerModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {

}
