import { IsDefined, IsEmail, IsString, Length, MinLength } from "class-validator"

export class loginDetailsDto{
    @IsString()
    @IsEmail()
    @IsDefined()
    email:string;
    @IsString()
    @IsDefined()
    @Length(6,16)
    password:string;
}

export class registerDetailDto{
    @IsString()
    @IsDefined()
    @MinLength(4)
    userName:string;
    @IsString()
    @IsEmail()
    @IsDefined()
    email:string;
    @IsString()
    @IsDefined()
    @Length(6,16)
    password:string;
}