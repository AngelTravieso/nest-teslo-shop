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

}
