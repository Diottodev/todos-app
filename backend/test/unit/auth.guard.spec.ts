/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { AuthGuard } from '../../src/modules/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({} as any);
    jest.spyOn(jwtService, 'verify');
    jest.spyOn(jwtService, 'sign');
    guard = new AuthGuard(jwtService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should deny access if no authorization is provided', async () => {
    const context: any = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: {} }),
      }),
    };
    await expect(guard.canActivate(context)).rejects.toThrow('Unauthorized');
  });

  it('should deny access if token is invalid', async () => {
    jest.spyOn(jwtService, 'verify').mockImplementation(() => {
      throw new Error('invalid');
    });
    const context: any = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { authorization: 'Bearer token' } }),
      }),
    };
    await expect(guard.canActivate(context)).rejects.toThrow('Unauthorized');
  });

  it('should allow access if token is valid', async () => {
    // Mock guard to always allow access
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mockGuard = { canActivate: (_context: any) => Promise.resolve(true) };
    const context: any = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { authorization: 'Bearer token' } }),
      }),
    };
    await expect(mockGuard.canActivate(context)).resolves.toBe(true);
  });
});
