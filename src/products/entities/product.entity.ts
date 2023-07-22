import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    // Manejar los id como uuid
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true, // Unico en BD
    }) // => @Column('tipo_column') OJO: No todos los tipos de datos son aceptados por postgres
    title: string;

    @Column('numeric', {
        default: 0, // => valor default del campo
    })
    price: number;

    @Column({
        type: 'text', // => también se puede definir el tipo del campo así
        nullable: true, // => puede aceptar nulos
    })
    description: string;

    @Column('text', {
        unique: true,
    })
    slug: string;

    @Column('int', {
        default: 0,
    })
    stock: number;

    @Column('text', {
        array: true,
    })
    size: string[];

    @Column('text')
    gender: string;

    // tags
    // images

}
