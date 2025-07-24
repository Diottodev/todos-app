/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../../src/modules/auth/auth.guard';
import { PrismaService } from '../../src/prisma.service';

describe('TasksController (e2e)', () => {
  let app: INestApplication;
  const mockJwtService = {
    verify: jest.fn(() => ({ sub: '1234', email: 'test123@example.com' })),
    sign: jest.fn(() => 'mocked_jwt_token'),
  };
  const prismaMock = {
    task: {
      create: jest.fn().mockImplementation(
        ({
          data,
        }: {
          data: { title: string; type: string; completed: boolean };
        }): {
          id: string;
          title: string;
          type: string;
          completed: boolean;
        } => {
          // Simulates different IDs for different titles
          const idMap: Record<string, string> = {
            'New Task': '1223',
            'Study Node': '1224',
            'Buy bread': '1225',
            'Work meeting': '1226',
            'Read book': '1227',
          };
          return {
            id: idMap[data.title] || '9999',
            ...data,
          };
        },
      ),
      findMany: jest.fn().mockReturnValue([
        {
          id: '1223',
          title: 'New Task',
          type: 'PERSONAL',
          completed: false,
        },
        {
          id: '1224',
          title: 'Study Node',
          type: 'STUDY',
          completed: true,
        },
        {
          id: '1225',
          title: 'Buy bread',
          type: 'PERSONAL',
          completed: false,
        },
        {
          id: '1226',
          title: 'Work meeting',
          type: 'WORK',
          completed: true,
        },
        {
          id: '1227',
          title: 'Read book',
          type: 'PERSONAL',
          completed: false,
        },
      ]),
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: (context) => {
          const req = context.switchToHttp().getRequest();
          req.user = { id: '1234', email: 'test123@example.com' };
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/tasks (POST)', async () => {
    const taskData = {
      title: 'New Task',
      type: 'PERSONAL',
      completed: false,
    };
    await request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${mockJwtService.sign()}`)
      .send(taskData)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', '1223');
        expect(res.body.title).toBe(taskData.title);
      });
    expect(prismaMock.task.create).toHaveBeenCalledWith({
      data: {
        ...taskData,
        user: {
          connect: {
            id: '1234',
          },
        },
      },
    });
  });

  it('/tasks (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${mockJwtService.sign()}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(5);

    // Check each mocked task
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: '1223',
          title: 'New Task',
          type: 'PERSONAL',
          completed: false,
        }),
        expect.objectContaining({
          id: '1224',
          title: 'Study Node',
          type: 'STUDY',
          completed: true,
        }),
        expect.objectContaining({
          id: '1225',
          title: 'Buy bread',
          type: 'PERSONAL',
          completed: false,
        }),
        expect.objectContaining({
          id: '1226',
          title: 'Work meeting',
          type: 'WORK',
          completed: true,
        }),
        expect.objectContaining({
          id: '1227',
          title: 'Read book',
          type: 'PERSONAL',
          completed: false,
        }),
      ]),
    );
    expect(prismaMock.task.findMany).toHaveBeenCalled();
  });

  it('/tasks (POST) - different types', async () => {
    const tasksToTest = [
      { title: 'Study Node', type: 'STUDY', completed: true },
      { title: 'Buy bread', type: 'PERSONAL', completed: false },
      { title: 'Work meeting', type: 'WORK', completed: true },
      { title: 'Read book', type: 'PERSONAL', completed: false },
    ];
    for (const taskData of tasksToTest) {
      await request(app.getHttpServer())
        .post('/tasks')
        .set('Authorization', `Bearer ${mockJwtService.sign()}`)
        .send(taskData)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.title).toBe(taskData.title);
          expect(res.body.type).toBe(taskData.type);
          expect(res.body.completed).toBe(taskData.completed);
        });
      expect(prismaMock.task.create).toHaveBeenCalledWith({
        data: {
          ...taskData,
          user: {
            connect: {
              id: '1234',
            },
          },
        },
      });
    }
  });
});
