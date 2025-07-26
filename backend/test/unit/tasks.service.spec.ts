/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../../src/modules/tasks/tasks.service';
import { CreateTaskDto } from '../../src/modules/tasks/dto/create-task.dto';
import { TaskType } from '../../src/common/types';
import { PrismaService } from '../../src/modules/database/prisma.service';
import { AuthGuard } from '../../src/modules/auth/auth.guard';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const mockTask = {
      id: '1',
      title: 'Test',
      type: TaskType.PERSONAL,
      completed: false,
      userId: '1',
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: {
            task: {
              findUnique: jest.fn((..._args) => {}),
              create: jest.fn(
                ({
                  data,
                }: {
                  data: Partial<typeof mockTask>;
                }): typeof mockTask => ({ ...mockTask, ...data }),
              ),
              update: jest.fn((..._args) => {}),
              delete: jest.fn((..._args) => {}),
              findMany: jest.fn((..._args) => {}),
            },
          },
        },
        {
          provide: AuthGuard,
          useValue: { canActivate: jest.fn(() => true) },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const dto: CreateTaskDto = {
      title: 'Test',
      type: TaskType.PERSONAL,
      completed: false,
    };
    const result = await service.create(dto, '1');
    expect(result).toHaveProperty('id');
    expect(result.title).toBe('Test');
  });

  it('should throw BadRequestException if userId is missing on create', async () => {
    const dto: CreateTaskDto = {
      title: 'Test',
      type: TaskType.PERSONAL,
      completed: false,
    };
    await expect(service.create(dto, '')).rejects.toThrow(
      'ID do usuário é obrigatório',
    );
  });

  it('should find all tasks for a user', async () => {
    const mockTasks = [
      {
        id: '1',
        title: 'Test',
        type: TaskType.PERSONAL,
        completed: false,
        userId: '1',
      },
      {
        id: '2',
        title: 'Test2',
        type: TaskType.WORK,
        completed: true,
        userId: '1',
      },
    ];
    (service['prisma'].task.findMany as jest.Mock).mockResolvedValueOnce(
      mockTasks,
    );
    const result = await service.findAll('1');
    expect(result).toEqual(mockTasks);
    expect(service['prisma'].task.findMany).toHaveBeenCalledWith({
      where: { userId: '1' },
    });
  });

  it('should find one task by id and userId', async () => {
    const mockTask = {
      id: '1',
      title: 'Test',
      type: TaskType.PERSONAL,
      completed: false,
      userId: '1',
    };
    (service['prisma'].task.findUnique as jest.Mock).mockResolvedValueOnce(
      mockTask,
    );
    const result = await service.findOne('1', '1');
    expect(result).toEqual(mockTask);
    expect(service['prisma'].task.findUnique as jest.Mock).toHaveBeenCalledWith(
      {
        where: { id: '1', userId: '1' },
      },
    );
  });

  it('should throw NotFoundException if task not found on findOne', async () => {
    (service['prisma'].task.findUnique as jest.Mock).mockResolvedValueOnce(
      null,
    );
    await expect(service.findOne('1', '1')).rejects.toThrow(
      'Tarefa não encontrada',
    );
  });

  it('should update a task', async () => {
    const mockTask = {
      id: '1',
      title: 'Updated',
      type: TaskType.PERSONAL,
      completed: true,
      userId: '1',
    };
    (service['prisma'].task.update as jest.Mock).mockResolvedValueOnce(
      mockTask,
    );
    const dto = {
      id: '1',
      title: 'Updated',
      type: TaskType.PERSONAL,
      completed: true,
    };
    const result = await service.update('1', dto, '1');
    expect(result).toEqual(mockTask);
    expect(service['prisma'].task.update).toHaveBeenCalledWith({
      where: { id: '1', userId: '1' },
      data: dto,
    });
  });
  it('should remove a task', async () => {
    const mockTask = {
      id: '1',
      title: 'Test',
      type: TaskType.PERSONAL,
      completed: false,
      userId: '1',
    };
    (service['prisma'].task.delete as jest.Mock).mockResolvedValueOnce(
      mockTask,
    );
    const result = await service.remove('1', '1');
    expect(result).toEqual(mockTask);
    expect(service['prisma'].task.delete).toHaveBeenCalledWith({
      where: { id: '1', userId: '1' },
    });
  });
});
