import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/modules/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../src/modules/database/prisma.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const mockUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test12345',
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
            signAsync: jest.fn().mockResolvedValue('token'),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(({ where }: { where: { email: string } }) => {
                if (where.email === mockUser.email) return mockUser;
                return null;
              }),
              create: jest.fn(
                ({ data }: { data: Partial<typeof mockUser> }) =>
                  ({ ...mockUser, ...data }) as typeof mockUser,
              ),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a token on login', async () => {
    const result = await service.login('test@example.com', 'test12345');
    expect(result).toHaveProperty('access_token');
    expect(result.access_token).toBe('token');
  });
});
