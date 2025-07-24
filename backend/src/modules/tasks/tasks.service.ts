import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    if (!userId) {
      throw new BadRequestException('ID do usuário é obrigatório');
    }
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll(userId: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { userId },
    });
  }

  async findOne(id: string, userId: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id, userId },
    });
    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }
    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userId: string,
  ): Promise<Task> {
    try {
      return await this.prisma.task.update({
        where: { id, userId },
        data: updateTaskDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Tarefa não encontrada');
      }
      throw error;
    }
  }

  async remove(id: string, userId: string): Promise<Task> {
    try {
      return await this.prisma.task.delete({
        where: { id, userId },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Tarefa não encontrada');
      }
      throw error;
    }
  }
}
