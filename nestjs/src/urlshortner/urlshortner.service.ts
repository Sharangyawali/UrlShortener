import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ShortUrlDto, UrlDto } from './dto/url-dto';
import { PrismaDbService } from 'src/prisma-db/prisma-db.service';
import {v4 as uuidv4} from 'uuid'


@Injectable()
export class UrlshortnerService {
    constructor(private prismaService:PrismaDbService){}
    async generateSHortUser(id:string,url:UrlDto['url']){
        let myuuid = uuidv4();
        let shortenedUrl=`http://localhost:3000/shortenedUrl/${myuuid}`
        try {
            await this.prismaService.shortened.create({
                data:{
                    userId:id,
                    url:url,
                    shortUrl:shortenedUrl
                }
            })
            return {
                success:true,
                message:"Successfully generated short url",
                data:{
                    actualUrl:url,
                    shortenedUrl:shortenedUrl
                }
            }
        } catch (error) {
            throw new HttpException({
                success:false,
                message:'Internal Error'
            },HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getActualUrl(id:string, shortUrl:ShortUrlDto['shortUrl']){
        try {
          const urls=await this.prismaService.shortened.findFirst({
                where:{
                    AND:[
                        {
                            shortUrl:shortUrl,
                        },
                        {
                            userId:id
                        }
                    ]
                }
            })
            return {
                success:true,
                message:"Successfully obtained actual url",
                data:{
                    actualUrl:urls.url,
                    shortenedUrl:urls.shortUrl
                }
            }
        } catch (error) {
            throw new HttpException({
                success:false,
                message:'Url not found'
            },HttpStatus.NOT_FOUND)
        }
    }
}
