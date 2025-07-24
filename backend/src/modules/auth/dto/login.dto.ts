import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'usuario@email.com',
    description: 'Email do usuário',
  })
  email: string;
  @ApiProperty({ example: 'senhaSegura123', description: 'Senha do usuário' })
  password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
