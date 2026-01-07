import { Livro } from 'src/modules/livros/domain/entities/livro.entity';
import { Usuario } from 'src/modules/usuarios/domain/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


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