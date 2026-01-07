import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from './api/controller/usuarios.controller';
import { UsuariosService } from './domain/services/usuarios.service';
import { Usuario } from './domain/entities/usuario.entity';
import { UsuarioRepository } from './data/repositories/usuario.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuariosController],
  providers: [
    UsuariosService,
    UsuarioRepository, // ← só adicionar aqui, o NestJS cuida do resto
  ],
  exports: [UsuariosService],
})
export class UsuariosModule {}