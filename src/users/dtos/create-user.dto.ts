import { IsNotEmpty, IsEmail, IsOptional } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
    
    @IsOptional()
    image: string;
}