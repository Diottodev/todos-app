import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'João Silva', description: 'Nome do usuário' })
  name: string;
  @ApiProperty({ example: 'joao@email.com', description: 'Email do usuário' })
  email: string;
  @ApiProperty({ example: 'senhaSegura123', description: 'Senha do usuário' })
  password: string;
  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
