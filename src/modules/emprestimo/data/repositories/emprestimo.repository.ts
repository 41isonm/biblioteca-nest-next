import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, DataSource } from 'typeorm';
import { Emprestimo } from '../../domain/entities/emprestimo.entity';
import { Usuario } from '../../../usuarios/domain/entities/usuario.entity';
import { Livro } from '../../../livros/domain/entities/livro.entity';
import { CreateEmprestimoDto } from '../../api/dto/create-emprestimo.dto';
import { IEmprestimoRepository } from '../../domain/repositories/iemprestimo.repository';

@Injectable()
export class EmprestimoRepository implements IEmprestimoRepository {
  constructor(
    @InjectRepository(Emprestimo)
    private readonly emprestimoRepo: Repository<Emprestimo>,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Livro)
    private readonly livroRepo: Repository<Livro>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(data: CreateEmprestimoDto): Promise<Emprestimo> {
    // Verifica usuário
    const usuario = await this.usuarioRepo.findOne({
      where: { id: data.usuarioId },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${data.usuarioId} não encontrado`);
    }

    // Verifica livro (usando livroid)
    const livro = await this.livroRepo.findOne({
      where: { livroid: data.livroId },
    });
    if (!livro) {
      throw new NotFoundException(`Livro com ID ${data.livroId} não encontrado`);
    }

    // Verifica se já está emprestado
    const emprestimoAtivo = await this.emprestimoRepo.findOne({
      where: {
        livro: { livroid: data.livroId },
        status: 'ativo',
      },
    });
    if (emprestimoAtivo) {
      throw new BadRequestException('Este livro já está emprestado');
    }

    const emprestimo = new Emprestimo();
    emprestimo.usuario = usuario;
    emprestimo.livro = livro;
    emprestimo.dataEmprestimo = new Date(data.dataEmprestimo);
    emprestimo.dataDevolucao = data.dataDevolucao ? new Date(data.dataDevolucao) : new Date();
    emprestimo.status = 'ativo';

    return await this.emprestimoRepo.save(emprestimo);
  }

  async findAll(): Promise<Emprestimo[]> {
    return this.emprestimoRepo.find({
      relations: ['usuario', 'livro'],
      order: { dataEmprestimo: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Emprestimo | null> {
    return this.emprestimoRepo.findOne({
      where: { id },
      relations: ['usuario', 'livro'],
    });
  }

  async findByUsuario(usuarioId: number): Promise<Emprestimo[]> {
    const usuarioExiste = await this.usuarioRepo.exists({ where: { id: usuarioId } });
    if (!usuarioExiste) {
      throw new NotFoundException(`Usuário com ID ${usuarioId} não encontrado`);
    }

    return this.emprestimoRepo.find({
      where: { usuario: { id: usuarioId } },
      relations: ['livro'],
      order: { dataEmprestimo: 'DESC' },
    });
  }

  async findByLivro(livroId: number): Promise<Emprestimo[]> {
    const livroExiste = await this.livroRepo.exists({ where: { livroid: livroId } });
    if (!livroExiste) {
      throw new NotFoundException(`Livro com ID ${livroId} não encontrado`);
    }

    return this.emprestimoRepo.find({
      where: { livro: { livroid: livroId } },
      relations: ['usuario'],
      order: { dataEmprestimo: 'DESC' },
    });
  }

  async devolverLivro(id: number): Promise<Emprestimo> {
    const emprestimo = await this.findOne(id);
    if (!emprestimo) {
      throw new NotFoundException(`Empréstimo com ID ${id} não encontrado`);
    }
    if (emprestimo.status === 'devolvido') {
      throw new BadRequestException('Este livro já foi devolvido');
    }

    emprestimo.dataDevolucao = new Date();
    emprestimo.status = 'devolvido';

    return await this.emprestimoRepo.save(emprestimo);
  }

  async remove(id: number): Promise<void> {
    const emprestimo = await this.findOne(id);
    if (emprestimo) {
      await this.emprestimoRepo.remove(emprestimo);
    }
  }

  async getEmprestimosAtivos(): Promise<Emprestimo[]> {
    return this.emprestimoRepo.find({
      where: { status: 'ativo' },
      relations: ['usuario', 'livro'],
      order: { dataEmprestimo: 'ASC' },
    });
  }

  async getEmprestimosAtrasados(): Promise<Emprestimo[]> {
    const hoje = new Date();
    return this.emprestimoRepo.find({
      where: {
        status: 'ativo',
        dataDevolucao: LessThanOrEqual(hoje),
      },
      relations: ['usuario', 'livro'],
    });
  }

  async getEstatisticas() {
    const total = await this.emprestimoRepo.count();
    const ativos = await this.emprestimoRepo.count({ where: { status: 'ativo' } });
    const devolvidos = await this.emprestimoRepo.count({ where: { status: 'devolvido' } });
    const atrasados = await this.emprestimoRepo.count({
      where: {
        status: 'ativo',
        dataDevolucao: LessThanOrEqual(new Date()),
      },
    });

    return { total, ativos, devolvidos, atrasados };
  }

  async getEmprestimosPorPeriodo(dataInicio: Date, dataFim: Date): Promise<Emprestimo[]> {
    return this.emprestimoRepo.find({
      where: {
        dataEmprestimo: Between(dataInicio, dataFim),
      },
      relations: ['usuario', 'livro'],
      order: { dataEmprestimo: 'ASC' },
    });
  }
}