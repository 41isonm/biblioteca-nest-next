import { Emprestimo } from "src/modules/emprestimo/domain/entities/emprestimo.entity";
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