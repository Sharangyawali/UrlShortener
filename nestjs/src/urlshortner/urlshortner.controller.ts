import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ShortUrlDto, UrlDto } from './dto/url-dto';
import {Request} from "express";
import { UrlshortnerService } from './urlshortner.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('urlshortner')
export class UrlshortnerController {
    constructor(private readonly urlShortnerService:UrlshortnerService){}

    @UseGuards(JwtAuthGuard)
    @Post('generate-short-url')
    @UsePipes(new ValidationPipe())
    async generateShortenerUrl(@Req()req:Request,@Body() body:UrlDto):Promise<any>{
        const id=req.user['userId'];
        return this.urlShortnerService.generateSHortUser(id,body.url);
    }

    @UseGuards(JwtAuthGuard)
    @Post('get-actual-url')
    async getActualUrl(@Req() req:Request,@Body() body:ShortUrlDto):Promise<any>{
        const id=req.user['userId'];
        return this.urlShortnerService.getActualUrl(id,body.shortUrl);
    }
}
