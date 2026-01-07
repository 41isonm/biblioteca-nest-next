import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateEmprestimoDto } from '../../api/dto/create-emprestimo.dto';
import { Emprestimo } from '../entities/emprestimo.entity';
import { EmprestimoRepository } from '../../data/repositories/emprestimo.repository';

@Injectable()
export class EmprestimoService {
  constructor(
    private readonly emprestimoRepository: EmprestimoRepository,
  ) {}

  async create(createEmprestimoDto: CreateEmprestimoDto): Promise<Emprestimo> {
    return this.emprestimoRepository.create(createEmprestimoDto);
  }

  async findAll(): Promise<Emprestimo[]> {
    return this.emprestimoRepository.findAll();
  }

  async findOne(id: number): Promise<Emprestimo> {
    const emprestimo = await this.emprestimoRepository.findOne(id);
    if (!emprestimo) {
      throw new NotFoundException(`Empréstimo com ID ${id} não encontrado`);
    }
    return emprestimo;
  }

  async findByUsuario(usuarioId: number): Promise<Emprestimo[]> {
    return this.emprestimoRepository.findByUsuario(usuarioId);
  }

  async findByLivro(livroId: number): Promise<Emprestimo[]> {
    return this.emprestimoRepository.findByLivro(livroId);
  }

  async devolverLivro(id: number): Promise<Emprestimo> {
    return this.emprestimoRepository.devolverLivro(id);
  }

  async remove(id: number): Promise<void> {
    return this.emprestimoRepository.remove(id);
  }

  async getEmprestimosAtivos(): Promise<Emprestimo[]> {
    return this.emprestimoRepository.getEmprestimosAtivos();
  }

  async getEmprestimosAtrasados(): Promise<Emprestimo[]> {
    return this.emprestimoRepository.getEmprestimosAtrasados();
  }

  async getEstatisticas() {
    return this.emprestimoRepository.getEstatisticas();
  }

  async getEmprestimosPorPeriodo(dataInicio: Date, dataFim: Date): Promise<Emprestimo[]> {
    return this.emprestimoRepository.getEmprestimosPorPeriodo(dataInicio, dataFim);
  }
}