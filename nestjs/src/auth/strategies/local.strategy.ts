import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService:AuthService){
        super({ usernameField: 'email' });
    }

    async validate(email:string,password:string): Promise<any>{
        const user=await this.authService.validateUser(email,password);
        if(!user){ throw new HttpException({success:false,message:'Please enter correct details'},HttpStatus.UNAUTHORIZED)}
            return user
    }
}