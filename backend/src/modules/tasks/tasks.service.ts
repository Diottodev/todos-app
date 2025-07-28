import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    if (!userId) {
      throw new Error('Usuário não autenticado');
    }
    if (!createTaskDto.title) {
      throw new Error('Título da tarefa é obrigatório');
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
    if (!userId) {
      throw new Error('Usuário não autenticado');
    }
    return this.prisma.task.findMany({
      where: { userId },
    });
  }

  async findOne(id: string, userId: string): Promise<Task | null> {
    if (!userId) {
      throw new Error('Usuário não autenticado');
    }
    if (!id) {
      throw new Error('ID da tarefa é obrigatório');
    }
    const result = await this.prisma.task.findUnique({
      where: { id, userId },
    });
    if (!result) {
      throw new Error('Tarefa não encontrada');
    }
    return result;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userId: string,
  ): Promise<Task> {
    if (!userId) {
      throw new Error('Usuário não autenticado');
    }
    if (!id) {
      throw new Error('ID da tarefa é obrigatório');
    }
    if (!updateTaskDto.title) {
      throw new Error('Título da tarefa é obrigatório');
    }
    return await this.prisma.task.update({
      where: { id, userId },
      data: updateTaskDto,
    });
  }

  async remove(id: string, userId: string): Promise<{ message: string }> {
    if (!userId) {
      throw new Error('Usuário não autenticado');
    }
    const removed = await this.prisma.task.delete({
      where: { id, userId },
    });
    if (!removed) {
      throw new Error('Tarefa não encontrada');
    }
    return { message: 'Tarefa removida com sucesso.' };
  }
}
