import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ShortUrlDto, UrlDto } from './dto/url-dto';
import { PrismaDbService } from 'src/prisma-db/prisma-db.service';


@Injectable()
export class UrlshortnerService {
    constructor(private prismaService:PrismaDbService){}

     generateUID():string{
        let firstPart:number = (Math.random() * 46656) | 0;
        let secondPart:number = (Math.random() * 46656) | 0;
        let firstPartString:string = ("000" + firstPart.toString(36)).slice(-3);
        let secondPartString:string = ("000" + secondPart.toString(36)).slice(-3);
        return firstPartString + secondPartString;
    }

    async generateSHortUser(id:string,url:UrlDto['url']){
        let myuuid = this.generateUID();
        let shortenedUrl=`http://localhost:3000/${myuuid}`
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
