import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import { validate as validateEmail } from 'email-validator';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async getProfile(userId: string) {
    if (!userId) {
      throw new UnauthorizedException('Usuário não autenticado.');
    }
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }
    return user;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ user: { name: string; email: string }; access_token: string }> {
    if (!email || !password) {
      throw new BadRequestException('Email e senha são obrigatórios.');
    }
    if (!validateEmail(email)) {
      throw new BadRequestException('Email inválido.');
    }
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) {
      throw new BadRequestException('Email não cadastrado.');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('Senha incorreta.');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      user: { name: user.name, email: user.email },
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<{ user: { name: string; email: string }; access_token: string }> {
    if (!name || !email || !password) {
      throw new BadRequestException('Nome, email e senha são obrigatórios.');
    }
    if (!validateEmail(email)) {
      throw new BadRequestException('Email inválido.');
    }
    if (password.length < 8) {
      throw new BadRequestException(
        'A senha deve ter pelo menos 8 caracteres.',
      );
    }
    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('Email já cadastrado.');
    }
    const user = await this.prismaService.user.create({
      data: { name, email, password },
    });
    const payload = { sub: user.id, email: user.email };
    return {
      user: { name: user.name, email: user.email },
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
