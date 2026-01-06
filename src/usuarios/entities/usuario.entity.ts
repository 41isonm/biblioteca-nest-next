import { Emprestimo } from "src/emprestimo/entities/emprestimo.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    primeiroNome: string;

    @Column()
    email: string;

    @Column()
    isActive: boolean;

    @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.usuario)
    emprestimos: Emprestimo[];
}