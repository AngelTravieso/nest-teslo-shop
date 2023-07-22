import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';


export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Type(() => Number ) // esto es igual que hacer enableImplicitConversion: true
    limit?: number;

    @IsOptional()
    @Min(0)
    @Type(() => Number )
    offset?: number;

}