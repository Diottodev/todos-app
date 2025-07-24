import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      console.log('Verifying token:', token);
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        email: string;
      }>(token, {
        secret: process.env.JWT_SECRET as string,
      });
      console.log('Token payload:', payload);
      console.log(
        (request['user'] = { id: payload.sub, email: payload.email }),
      );
      request['user'] = { id: payload.sub, email: payload.email };
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const headers = request['headers'] as Record<string, string | undefined>;
    const rawAuth = headers?.authorization;
    if (typeof rawAuth !== 'string') return undefined;
    const [type, token] = rawAuth.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
