import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    // Manejar los id como uuid
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true, // Unico en BD
    }) // => @Column('tipo_column') OJO: No todos los tipos de datos son aceptados por postgres
    title: string;

    @Column('float', {
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
    
    // Llama un método cuyo decorador es aplicado antes de la inserción de la entidad
    @BeforeInsert()
    checkSlugInsert() { // Método personalizado que se ejecuta antes de hacer el insert en la BD
        // Si no viene slug
        if( !this.slug ) { // hago this para hacer referencia a la instancia de mi entidad
            this.slug = this.title; // lo tomo del título
        }

        // Si viene tomo el slug y modifico el string
        this.slug = this.slug
            .toLocaleLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        // Si viene tomo el slug y modifico el string
        this.slug = this.slug
            .toLocaleLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }

}
