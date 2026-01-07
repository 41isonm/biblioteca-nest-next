import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEmprestimoDto {
  @ApiProperty({
    description: 'ID do usuário que está realizando o empréstimo',
    example: 1,
    required: true,
  })

  usuarioId: number;

  @ApiProperty({
    description: 'ID do livro que está sendo emprestado',
    example: 1,
    required: true,
  })

  livroId: number;

  @ApiProperty({
    description: 'Data do empréstimo (formato ISO 8601: YYYY-MM-DD)',
    example: '2024-01-15',
    required: true,
  })
  
  dataEmprestimo: string;

  @ApiPropertyOptional({
    description: 'Data de devolução (formato ISO 8601: YYYY-MM-DD)',
    example: '2024-01-30',
    required: false,
  })

  dataDevolucao?: string | null;
}