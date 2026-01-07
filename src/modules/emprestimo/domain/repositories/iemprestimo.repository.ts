import { CreateEmprestimoDto } from '../../api/dto/create-emprestimo.dto';
import { Emprestimo } from '../entities/emprestimo.entity';

export interface IEmprestimoRepository {
  create(data: CreateEmprestimoDto): Promise<Emprestimo>;
  findAll(): Promise<Emprestimo[]>;
  findOne(id: number): Promise<Emprestimo | null>;
  findByUsuario(usuarioId: number): Promise<Emprestimo[]>;
  findByLivro(livroId: number): Promise<Emprestimo[]>;
  devolverLivro(id: number): Promise<Emprestimo>;
  remove(id: number): Promise<void>;
  getEmprestimosAtivos(): Promise<Emprestimo[]>;
  getEmprestimosAtrasados(): Promise<Emprestimo[]>;
  getEstatisticas(): Promise<{
    total: number;
    ativos: number;
    devolvidos: number;
    atrasados: number;
  }>;
  getEmprestimosPorPeriodo(dataInicio: Date, dataFim: Date): Promise<Emprestimo[]>;
}