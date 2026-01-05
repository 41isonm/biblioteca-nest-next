import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Livro {
    @PrimaryGeneratedColumn()
    livroid: number

    @Column()
    livrotitulo: string

    @Column()
    livrodescricao: string

    @Column()
    livropreco: number
}