/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should run app correctly', () => {
    expect(app).toBeDefined();
  });

  it('GET /health retorna 200', async () => {
    const response = await app.getHttpServer().inject({
      method: 'GET',
      url: '/health',
    });
    expect(response.statusCode).toBe(200);
  });

  it('GET / retorna 200', async () => {
    const response = await app.getHttpServer().inject({
      method: 'GET',
      url: '/',
    });
    expect(response.statusCode).toBe(200);
  });
});
