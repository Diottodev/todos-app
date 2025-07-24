/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AuthController } from '../../src/modules/auth/auth.controller';
import { AuthService } from '../../src/modules/auth/auth.service';
import { LoginDto } from '../../src/modules/auth/dto/login.dto';
import { RegisterDto } from '../../src/modules/auth/dto/register.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(() => {
    service = {
      login: jest.fn(({ email, password }: LoginDto) => {
        return {
          user: {
            id: 'mock-id',
            name: 'mock-name',
            email,
            password,
          },
          access_token: 'mock-access-token',
        };
      }),
      register: jest.fn(({ name, email, password }: RegisterDto) => {
        return {
          user: {
            id: 'mock-id',
            name,
            email,
            password,
          },
          access_token: 'mock-access-token',
        };
      }),
    } as any;
    controller = new AuthController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call login', async () => {
    const mockUser = { name: 'User Name', email: 'user@example.com' };
    const dto = new LoginDto(mockUser.email, 'password123');
    await controller.login(dto);
    expect(service.login).toHaveBeenCalledWith(dto.email, dto.password);
  });

  it('should call register', async () => {
    const dto = new RegisterDto('mock-name', 'mock-email', 'mock-password');
    await controller.register(dto);
    expect(service.register).toHaveBeenCalledWith(
      dto.name,
      dto.email,
      dto.password,
    );
  });
});
