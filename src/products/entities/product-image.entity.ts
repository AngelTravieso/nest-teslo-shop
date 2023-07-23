import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

/*
    No lleva como nombre ProductImageEntity para evitar que la tabla de scree con ese nombre
*/
@Entity()
export class ProductImage {
    
    @PrimaryGeneratedColumn() // => si lo dejo así, por defecto sera un ID de tabla normal
    id: number;

    @Column('text')
    url: string;

    @ManyToOne(
        () => Product,
        product => product.images,
    ) // => Relación de muchos a uno
    product: Product; // => Muchas imágenes pueden tener solo un producto

}