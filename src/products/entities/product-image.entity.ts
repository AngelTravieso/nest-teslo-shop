import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/*
    No lleva como nombre ProductImageEntity para evitar que la tabla de scree con ese nombre
*/
@Entity()
export class ProductImage {
    
    @PrimaryGeneratedColumn() // => si lo dejo así, por defecto sera un ID de tabla normal
    id: number;

    @Column('text')
    url: string;

}