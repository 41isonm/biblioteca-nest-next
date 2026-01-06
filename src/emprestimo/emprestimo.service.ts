import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Emprestimo } from './entities/emprestimo.entity';
import { Repository, Between, MoreThanOrEqual, LessThanOrEqual, DataSource } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Livro } from '../livros/entities/livro.entity';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';

@Injectable()
export class EmprestimoService {
  constructor(
    @InjectRepository(Emprestimo)
    private emprestimoRepository: Repository<Emprestimo>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Livro)
    private livroRepository: Repository<Livro>,
    private dataSource: DataSource  
  ) {}


  async create(createEmprestimoDto: CreateEmprestimoDto): Promise<Emprestimo> {
  // Verificar se usuário existe
  const usuario = await this.usuarioRepository.findOne({
    where: { id: createEmprestimoDto.usuarioId }  // Usuário ainda usa 'id'
  });
  
  if (!usuario) {
    throw new NotFoundException(`Usuário com ID ${createEmprestimoDto.usuarioId} não encontrado`);
  }

  // Verificar se livro existe - AGORA use 'livroid'
  const livro = await this.livroRepository.findOne({
    where: { livroid: createEmprestimoDto.livroId }  // ← livroid
  });
  
  if (!livro) {
    throw new NotFoundException(`Livro com ID ${createEmprestimoDto.livroId} não encontrado`);
  }

  // Verificar se livro já está emprestado - AGORA use 'livroid'
  const emprestimoAtivo = await this.emprestimoRepository.findOne({
    where: {
      livro: { livroid: createEmprestimoDto.livroId },  // ← livroid
      status: 'ativo'
    }
  });

  if (emprestimoAtivo) {
    throw new BadRequestException('Este livro já está emprestado');
  }

  const emprestimo = new Emprestimo();
  emprestimo.usuario = usuario;
  emprestimo.livro = livro;
  emprestimo.dataEmprestimo = new Date(createEmprestimoDto.dataEmprestimo);
  emprestimo.dataDevolucao = createEmprestimoDto.dataDevolucao 
    ? new Date(createEmprestimoDto.dataDevolucao) 
    : new Date();
  emprestimo.status = 'ativo';

  return await this.emprestimoRepository.save(emprestimo);
}

  async findAll(): Promise<Emprestimo[]> {
    return await this.emprestimoRepository.find({
      relations: ['usuario', 'livro'],
      order: { dataEmprestimo: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Emprestimo> {
    const emprestimo = await this.emprestimoRepository.findOne({
      where: { id },
      relations: ['usuario', 'livro']
    });

    if (!emprestimo) {
      throw new NotFoundException(`Empréstimo com ID ${id} não encontrado`);
    }

    return emprestimo;
  }

  async findByUsuario(usuarioId: number): Promise<Emprestimo[]> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: usuarioId }
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${usuarioId} não encontrado`);
    }

    return await this.emprestimoRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: ['livro'],
      order: { dataEmprestimo: 'DESC' }
    });
  }

  async findByLivro(livroId: number): Promise<Emprestimo[]> {
    const livro = await this.livroRepository.findOne({
      where: { livroid: livroId }
    });

    if (!livro) {
      throw new NotFoundException(`Livro com ID ${livroId} não encontrado`);
    }

    return await this.emprestimoRepository.find({
      where: { livro: { livroid: livroId } },
      relations: ['usuario'],
      order: { dataEmprestimo: 'DESC' }
    });
  }

 
  async devolverLivro(id: number): Promise<Emprestimo> {
    const emprestimo = await this.findOne(id);
    
    if (emprestimo.status === 'devolvido') {
      throw new BadRequestException('Este livro já foi devolvido');
    }

    emprestimo.dataDevolucao = new Date();
    emprestimo.status = 'devolvido';

    return await this.emprestimoRepository.save(emprestimo);
  }

  async remove(id: number): Promise<void> {
    const emprestimo = await this.findOne(id);
    await this.emprestimoRepository.remove(emprestimo);
  }

  async getEmprestimosAtivos(): Promise<Emprestimo[]> {
    return await this.emprestimoRepository.find({
      where: { status: 'ativo' },
      relations: ['usuario', 'livro'],
      order: { dataEmprestimo: 'ASC' }
    });
  }

  async getEmprestimosAtrasados(): Promise<Emprestimo[]> {
    const hoje = new Date();
    
    return await this.emprestimoRepository.find({
      where: {
        status: 'ativo',
        dataDevolucao: LessThanOrEqual(hoje)
      },
      relations: ['usuario', 'livro']
    });
  }

  async getEstatisticas() {
    const total = await this.emprestimoRepository.count();
    const ativos = await this.emprestimoRepository.count({ where: { status: 'ativo' } });
    const devolvidos = await this.emprestimoRepository.count({ where: { status: 'devolvido' } });
    const atrasados = await this.emprestimoRepository.count({ 
      where: { 
        status: 'ativo',
        dataDevolucao: LessThanOrEqual(new Date())
      } 
    });

    return {
      total,
      ativos,
      devolvidos,
      atrasados
    };
  }

  async getEmprestimosPorPeriodo(dataInicio: Date, dataFim: Date): Promise<Emprestimo[]> {
    return await this.emprestimoRepository.find({
      where: {
        dataEmprestimo: Between(dataInicio, dataFim)
      },
      relations: ['usuario', 'livro'],
      order: { dataEmprestimo: 'ASC' }
    });
  }
}