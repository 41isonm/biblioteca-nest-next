import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    email: string

    @Column()
    isActive: boolean
}