import { Emprestimo } from 'src/modules/emprestimo/domain/entities/emprestimo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('livros') 
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