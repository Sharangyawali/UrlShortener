import {IsDefined, IsString, Matches } from "class-validator";

export class UrlDto{
    @Matches(new RegExp(/^http:\/\/localhost:3000\/.+/i),{
        message:'URL must start with http://localhost:3000/'
    })
    url:string
}

export class ShortUrlDto{
    @Matches(new RegExp(/^http:\/\/localhost:3000\/shortenedUrl\/.+/i),{
        message:'Shortened URL must start with http://localhost:3000/shortenedUrl/'
    })
    shortUrl:string
}