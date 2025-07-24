import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  NotFoundException,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Request } from 'express';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import type { Task } from '@prisma/client';
import { TaskResponseDto } from './dto/task-response.dto';
import { AuthGuard } from '../auth/auth.guard';

export interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

@ApiTags('tasks')
@ApiBearerAuth('default')
@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova tarefa' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: 201,
    description: 'Tarefa criada com sucesso.',
    schema: {
      example: {
        id: '1',
        title: 'Nova Tarefa',
        type: 'PERSONAL',
        completed: false,
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado.',
    schema: { example: { message: 'Usuário não autenticado' } },
  })
  @ApiResponse({ status: 401, description: 'Usuário não autenticado.' })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<Task | typeof Error> {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException('Usuário não autenticado');
    }
    const userId = req.user.id;
    return this.tasksService.create(createTaskDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as tarefas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarefas retornada com sucesso.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          type: { type: 'string', enum: ['PERSONAL', 'WORK', 'STUDY'] },
          completed: { type: 'boolean' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado.',
    schema: { example: { message: 'Usuário não autenticado' } },
  })
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req: AuthenticatedRequest): Promise<TaskResponseDto[]> {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException('Usuário não autenticado');
    }
    const userId = req.user.id;
    return (await this.tasksService.findAll(userId)) as TaskResponseDto[];
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma tarefa pelo ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Tarefa encontrada.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        type: { type: 'string', enum: ['PERSONAL', 'WORK', 'STUDY'] },
        completed: { type: 'boolean' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado.',
    schema: { example: { message: 'Usuário não autenticado' } },
  })
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<Task> {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException('Usuário não autenticado');
    }
    const userId = req.user.id;
    const task = await this.tasksService.findOne(id, userId);
    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }
    return task;
  }

  @Put(':id/edit')
  @ApiOperation({ summary: 'Atualiza uma tarefa pelo ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({
    status: 200,
    description: 'Tarefa atualizada.',
    schema: {
      type: 'object',
      example: {
        id: '1',
        title: 'Tarefa Atualizada',
        type: 'PERSONAL',
        completed: true,
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado.',
    schema: { example: { message: 'Usuário não autenticado' } },
  })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<Task> {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException('Usuário não autenticado');
    }
    const userId = req.user.id;
    const updated = await this.tasksService.update(id, updateTaskDto, userId);
    if (!updated) {
      throw new NotFoundException('Tarefa não encontrada');
    }
    return updated;
  }

  @Patch(':id/complete')
  @ApiOperation({
    summary: 'Atualiza o status de conclusão de uma tarefa pelo ID',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({
    status: 200,
    description: 'Status de conclusão atualizado.',
    schema: {
      type: 'object',
      example: {
        id: '1',
        title: 'Tarefa Atualizada',
        type: 'PERSONAL',
        completed: false,
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado.',
    schema: { example: { message: 'Usuário não autenticado' } },
  })
  @HttpCode(HttpStatus.OK)
  async updateStatus(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<Task> {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException('Usuário não autenticado');
    }
    const userId = req.user.id;
    const updated = await this.tasksService.update(id, updateTaskDto, userId);
    if (!updated) {
      throw new NotFoundException('Tarefa não encontrada');
    }
    return updated;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma tarefa pelo ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Tarefa removida.',
    schema: { example: { message: 'Tarefa removida com sucesso.' } },
  })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado.',
    schema: { example: { message: 'Usuário não autenticado' } },
  })
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<{ message: string }> {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException('Usuário não autenticado');
    }
    const userId = req.user.id;
    const removed = await this.tasksService.remove(id, userId);
    if (!removed) {
      throw new NotFoundException('Tarefa não encontrada');
    }
    return { message: 'Tarefa removida com sucesso.' };
  }
}
