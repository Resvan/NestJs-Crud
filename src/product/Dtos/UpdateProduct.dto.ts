import { IsArray, IsOptional, IsNumber, IsString } from "class-validator";
import { Stock } from "src/types/types";

export class UpdateProductDto {

    @IsOptional()
    @IsString()

    title: string;

    @IsOptional()
    @IsString()

    description: string;

    @IsOptional()
    @IsNumber()

    price: number;

    @IsOptional()
    images: Array<string>;

    @IsOptional()
    stock: Stock;

}