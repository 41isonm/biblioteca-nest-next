import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Emprestimo } from '../../../emprestimo/domain/entities/emprestimo.entity';

@Entity('livros')
export class Livro {
  @PrimaryGeneratedColumn()
  livroid!: number;

  @Column()
  livrotitulo!: string;

  @Column()
  livrodescricao!: string;

  @Column()
  livropreco!: number;

  @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.livro)
  emprestimos!: Emprestimo[];
}