import { ApiProperty } from '@nestjs/swagger';

export class CreateLivroDto {
  @ApiProperty({
    description: 'Título do livro',
    example: 'Dom Casmurro',
    required: true,
  })

  livrotitulo: string;

  @ApiProperty({
    description: 'Descrição do livro',
    example: 'Romance clássico brasileiro escrito por Machado de Assis',
    required: true,
  })

  livrodescricao: string;

  @ApiProperty({
    description: 'Preço do livro',
    example: 49.90,
    minimum: 0,
    required: true,
  })

  livropreco: number;
}