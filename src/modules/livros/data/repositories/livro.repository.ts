import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Livro } from '../../domain/entities/livro.entity';
import { CreateLivroDto } from '../../api/dto/create-livro.dto';
import { ILivroRepository } from '../../domain/repositories/ilivros.repository';

@Injectable()
export class LivroRepository implements ILivroRepository {
  constructor(
    @InjectRepository(Livro)
    private readonly repo: Repository<Livro>,
  ) {}

  async create(data: CreateLivroDto): Promise<Livro> {
    const livro = this.repo.create(data);
    return await this.repo.save(livro);
  }

  async findAll(): Promise<Livro[]> {
    return await this.repo.find();
  }

  async findById(id: string | number): Promise<Livro | null> {
    return await this.repo.findOne({ where: { id } as any }); 
  }

 

  async remove(id: string | number): Promise<void> {
    const livro = await this.findById(id);
    if (livro) {
      await this.repo.remove(livro);
    }
  }

  async softRemove(id: string | number): Promise<void> {
    await this.repo.update(id, { isActive: false } as any);
  }
}