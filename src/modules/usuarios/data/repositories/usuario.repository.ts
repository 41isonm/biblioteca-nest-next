import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from '../../api/dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../../api/dto/update-usuario.dto';
import { IUsuarioRepository } from '../../domain/repositories/iusuario.repository';
import { Usuario } from '../../domain/entities/usuario.entity';


@Injectable()
export class UsuarioRepository implements IUsuarioRepository {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async create(data: CreateUsuarioDto): Promise<Usuario> {
    const usuario = this.usuariosRepository.create(data);
    return await this.usuariosRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuariosRepository.find();
  }

 async findById(id: number): Promise<Usuario | null> {
   
    return await this.usuariosRepository.findOne({ where: { id: id } });
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return await this.usuariosRepository.findOne({ where: { email } });
  }

  async update(id: number, data: Partial<UpdateUsuarioDto>): Promise<Usuario> {
    await this.usuariosRepository.update(id, data);
    const updated = await this.findById(id);
    if (!updated) {
      throw new Error('Usuário não encontrado após atualização');
    }
    return updated;
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findById(id);
    if (usuario) {
      await this.usuariosRepository.remove(usuario);
    }
  }

  async softRemove(id: number): Promise<void> {
    await this.usuariosRepository.update(id, { isActive: false } as any);
  }
}