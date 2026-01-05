import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Livro } from './entities/livro.entity';
import { CreateLivroDto } from './dto/create-livro.dto';

@Injectable()
export class LivrosService {
  constructor(
    @InjectRepository(Livro)
    private livrosRepository: Repository<Livro>,
  ) {}

  async create(createLivroDto: CreateLivroDto): Promise<Livro> {
    const livro = this.livrosRepository.create(createLivroDto);
    return await this.livrosRepository.save(livro);
  }

  async findAll(): Promise<Livro[]> {
    return await this.livrosRepository.find();
  }

  async findOne(livroid: number): Promise<Livro> {
    const livro = await this.livrosRepository.findOne({ where: { livroid } });
    
    if (!livro) {
      throw new NotFoundException(`Livro com ID ${livroid} não encontrado`);
    }
    
    return livro;
  }

 

  async remove(id: number): Promise<void> {
    const livro = await this.findOne(id);
    
    await this.livrosRepository.remove(livro);
  }

 
}