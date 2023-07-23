import { IsArray,IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {

    @IsString()
    @MinLength(1)
    title: string;

    @IsNumber() // => acepta doubles
    @IsPositive()
    @IsOptional()
    price?: number;    

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    slug?: string;

    @IsInt() // => enteros
    @IsPositive()
    @IsOptional()
    stock?: number;

    @IsString({ each: true }) // => cada item del array debe ser un string
    @IsArray()
    size: string[];

    @IsIn(['men', 'women', 'kid', 'unisex']) // => deben venir solo estos valores
    @IsString()
    gender: string;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[];

}
