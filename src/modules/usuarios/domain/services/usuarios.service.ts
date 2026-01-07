import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from '../../api/dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../../api/dto/update-usuario.dto';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioRepository } from '../../data/repositories/usuario.repository';

@Injectable()
export class UsuariosService {
   constructor(
    private readonly usuarioRepository: UsuarioRepository, // ← direto, sem @Inject, sem token
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return await this.usuarioRepository.create(createUsuarioDto);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.findAll();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario =  await this.usuarioRepository.findById(id);    
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    
    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findByEmail(email);
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    
    Object.assign(usuario, updateUsuarioDto);
    
    return await this.usuarioRepository.update(id, updateUsuarioDto);
  }

  async remove(id: number): Promise<void> {
    
    await this.usuarioRepository.remove(id);
  }

  async softRemove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    
    usuario.isActive = false;
    await this.usuarioRepository.update(id, { isActive: false });
  }
}