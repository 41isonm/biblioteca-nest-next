import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Livro } from './domain/entities/livro.entity';
import { LivrosService } from './domain/services/livros.service';
import { LivrosController } from './api/controller/livros.controller';
import { LivroRepository } from './data/repositories/livro.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Livro])],

  controllers: [LivrosController],
  providers: [LivrosService,LivroRepository],
  exports: [LivrosService],

})
export class LivrosModule {}

