import { CreateUsuarioDto } from '../../api/dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../../api/dto/update-usuario.dto';
import { Usuario } from '../entities/usuario.entity';

export interface IUsuarioRepository {
  create(data: CreateUsuarioDto): Promise<Usuario>;
  findAll(): Promise<Usuario[]>;
  findById(id: number): Promise<Usuario | null>;      
  findByEmail(email: string): Promise<Usuario | null>;
  update(id: number, data: Partial<UpdateUsuarioDto>): Promise<Usuario>;
  remove(id: number): Promise<void>;
  softRemove(id: number): Promise<void>;
}