import { Module } from '@nestjs/common';
import { EmprestimoService } from './domain/services/emprestimo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livro } from 'src/modules/livros/domain/entities/livro.entity';
import { Usuario } from 'src/modules/usuarios/domain/entities/usuario.entity';
import { Emprestimo } from './domain/entities/emprestimo.entity';
import { EmprestimoController } from './api/controller/emprestimo.controller';

@Module({
  imports: [  TypeOrmModule.forFeature([Emprestimo, Usuario, Livro]),],

  controllers: [EmprestimoController],
  providers: [EmprestimoService],
  exports:  [EmprestimoService]
})
export class EmprestimoModule {}

