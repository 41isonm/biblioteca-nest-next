import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Livro } from '../../livros/entities/livro.entity';

@Entity('emprestimos')
export class Emprestimo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.emprestimos)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Livro, (livro) => livro.emprestimos)
  @JoinColumn({ name: 'livro_id' })
  livro: Livro;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataEmprestimo: Date;

  @Column({ type: 'timestamp', nullable: true })
  dataDevolucao: Date;

  @Column({ default: 'pendente' })
  status: string;
}