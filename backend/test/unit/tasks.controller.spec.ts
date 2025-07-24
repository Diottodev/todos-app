/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TasksController } from '../../src/modules/tasks/tasks.controller';
import { TasksService } from '../../src/modules/tasks/tasks.service';
import { CreateTaskDto } from '../../src/modules/tasks/dto/create-task.dto';
import { UpdateTaskDto } from '../../src/modules/tasks/dto/update-task.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockUserId = 'mock-user-id';
  const mockReq = { user: { id: mockUserId } } as any;

  beforeEach(() => {
    service = {
      prisma: {},
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as unknown as TasksService;
    controller = new TasksController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create with dto and userId', async () => {
    const dto = new CreateTaskDto('Test', undefined, false);
    await controller.create(dto, mockReq);
    expect(service.create).toHaveBeenCalledWith(dto, mockUserId);
  });

  it('should call findAll with userId', async () => {
    await controller.findAll(mockReq);
    expect(service.findAll).toHaveBeenCalledWith(mockUserId);
  });

  it('should call findOne with id and userId', async () => {
    (service.findOne as jest.Mock).mockResolvedValueOnce({});
    await controller.findOne('1', mockReq);
    expect(service.findOne).toHaveBeenCalledWith('1', mockUserId);
  });

  it('should call update with id, dto and userId', async () => {
    const dto = new UpdateTaskDto('1', 'Test', undefined, false);
    (service.update as jest.Mock).mockResolvedValueOnce({});
    await controller.update('1', dto, mockReq);
    expect(service.update).toHaveBeenCalledWith('1', dto, mockUserId);
  });

  it('should call remove with id and userId', async () => {
    (service.remove as jest.Mock).mockResolvedValueOnce({});
    await controller.remove('1', mockReq);
    expect(service.remove).toHaveBeenCalledWith('1', mockUserId);
  });
});
