import { Module } from '@nestjs/common';
import { EmprestimoService } from './emprestimo.service';
import { EmprestimoController } from './emprestimo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emprestimo } from './entities/emprestimo.entity';
import { Livro } from 'src/livros/entities/livro.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [  TypeOrmModule.forFeature([Emprestimo, Usuario, Livro]),],

  controllers: [EmprestimoController],
  providers: [EmprestimoService],
  exports:  [EmprestimoService]
})
export class EmprestimoModule {}

