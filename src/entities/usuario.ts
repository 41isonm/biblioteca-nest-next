import { Emprestimo } from "src/emprestimo/entities/emprestimo.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    email: string;

    @Column()
    isActive: boolean;

    // Um usuário pode ter vários empréstimos
    @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.usuario)
    emprestimos: Emprestimo[];
}