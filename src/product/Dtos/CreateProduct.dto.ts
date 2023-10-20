import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { Stock } from "src/types/types";

export class CreateProductDto {
    
    @IsNotEmpty()
    @IsString()

    title: string;

    @IsNotEmpty()
    @IsString()

    description: string;

    @IsNotEmpty()
    @IsNumber()

    price: number;

    @IsNotEmpty()
    @IsArray()
    images: Array<string>;

    @IsNotEmpty()
    stock: Stock;

}