/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/modules/database/prisma.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prismaMock: any;

  beforeAll(async () => {
    prismaMock = {
      user: {
        create: jest.fn().mockImplementation(() => {
          return {
            id: 1,
            name: 'Test User',
            email: 'test1@example.com',
            password: 'test12345',
          };
        }),
        findUnique: jest
          .fn()
          .mockImplementation(({ where }: { where: { email: string } }) => {
            if (where.email === 'test2@example.com') {
              return {
                id: 1,
                name: 'Test User',
                email: 'test2@example.com',
                password: 'test12345',
              };
            }
            return null;
          }),
      },
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/register (POST) - sucesso', async () => {
    const validUser = {
      name: 'Test User',
      email: 'test1@example.com',
      password: 'test12345',
    };
    await request(app.getHttpServer())
      .post('/auth/register')
      .send(validUser)
      .expect(201)
      .expect((res) => {
        expect(res.body.user).toHaveProperty('name', validUser.name);
        expect(res.body.user).toHaveProperty('email', validUser.email);
        expect(res.body).toHaveProperty('access_token');
      });
  });

  it('/auth/register (POST) - email inválido', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ name: 'Teste', email: 'invalido', password: '123456' })
      .expect(400);
  });

  it('/auth/login (POST) - sucesso', async () => {
    const validLogin = {
      name: 'Test User',
      email: 'test2@example.com',
      password: 'test12345',
    };
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: validLogin.email, password: validLogin.password })
      .expect(200)
      .expect((res) => {
        expect(res.body.user).toHaveProperty('name', validLogin.name);
        expect(res.body.user).toHaveProperty('email', validLogin.email);
        expect(res.body).toHaveProperty('access_token');
      });
  });

  it('/auth/login (POST) - senha errada', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test2@example.com', password: 'errada' })
      .expect(401);
  });

  it('/auth/login (POST) - usuário não encontrado', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'naoexiste@teste.com', password: 'qualquer' })
      .expect(401);
  });

  it('/auth/login (POST)', async () => {
    const validLogin = {
      name: 'Test User',
      email: 'test2@example.com',
      password: 'test12345',
    };
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: validLogin.email, password: validLogin.password })
      .expect(200)
      .expect((res) => {
        expect(res.body.user).toHaveProperty('name', validLogin.name);
        expect(res.body.user).toHaveProperty('email', validLogin.email);
        expect(res.body).toHaveProperty('access_token');
      });
  });
});
