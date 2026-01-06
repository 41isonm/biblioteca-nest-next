import { Emprestimo } from "src/emprestimo/entities/emprestimo.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Livro {
    @PrimaryGeneratedColumn()
    livroid: number;

    @Column()
    livrotitulo: string;

    @Column()
    livrodescricao: string;

    @Column()
    livropreco: number;

    @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.livro)
    emprestimos: Emprestimo[];
}