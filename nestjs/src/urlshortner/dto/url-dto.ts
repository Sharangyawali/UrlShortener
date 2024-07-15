import {IsDefined, IsString, Matches } from "class-validator";

export class UrlDto{
    @Matches(new RegExp(/^https?:\/\/.+/i),{
        message:'URL must start with http:// or https://'
    })
    url:string
}

export class ShortUrlDto{
    @Matches(new RegExp(/^https?:\/\/l.+/i),{
        message:'Shortened URL must start with http:// or https://'
    })
    shortUrl:string
}