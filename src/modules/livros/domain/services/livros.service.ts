import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLivroDto } from '../../api/dto/create-livro.dto';
import { Livro } from '../entities/livro.entity';
import { LivroRepository } from '../../data/repositories/livro.repository';

@Injectable()
export class LivrosService {
  constructor(
    private readonly livroRepository: LivroRepository,
  ) {}

  async create(createLivroDto: CreateLivroDto): Promise<Livro> {
    return await this.livroRepository.create(createLivroDto);
  }

  async findAll(): Promise<Livro[]> {
    return await this.livroRepository.findAll();
  }

  async findOne(id: string | number): Promise<Livro> {
    const livro = await this.livroRepository.findById(id);

    if (!livro) {
      throw new NotFoundException(`Livro com ID ${id} não encontrado`);
    }

    return livro;
  }



  async remove(id: string | number): Promise<void> {
    await this.findOne(id);
    await this.livroRepository.remove(id);
  }

  async softRemove(id: string | number): Promise<void> {
    await this.findOne(id);
    await this.livroRepository.softRemove(id);
  }
}