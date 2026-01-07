import { CreateLivroDto } from '../../api/dto/create-livro.dto';
import { Livro } from '../entities/livro.entity';

export interface ILivroRepository {
  create(data: CreateLivroDto): Promise<Livro>;
  findAll(): Promise<Livro[]>;
  findById(id: string | number): Promise<Livro | null>; 
  remove(id: string | number): Promise<void>;
  softRemove(id: string | number): Promise<void>;
}