import { Module } from '@nestjs/common';
import { EmprestimoService } from './domain/services/emprestimo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livro } from '../livros/domain/entities/livro.entity';        // ← relativo
import { Usuario } from '../usuarios/domain/entities/usuario.entity';  // ← relativo
import { Emprestimo } from './domain/entities/emprestimo.entity';
import { EmprestimoController } from './api/controller/emprestimo.controller';
import { EmprestimoRepository } from './data/repositories/emprestimo.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Emprestimo, Usuario, Livro]),
  ],
  controllers: [EmprestimoController],
  providers: [EmprestimoService, EmprestimoRepository],
  exports: [EmprestimoService],
})
export class EmprestimoModule {}