import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Primeiro nome do usuário',
    example: 'João',
    required: true,
  })

  primeiroNome: string;

  @ApiProperty({
    description: 'Email do usuário (deve ser único)',
    example: 'joao@email.com',
    required: true,
  })

  email: string;

  @ApiProperty({
    description: 'Status do usuário (ativo/inativo)',
    example: true,
    default: true,
    required: false,
  })

  isActive?: boolean;
}