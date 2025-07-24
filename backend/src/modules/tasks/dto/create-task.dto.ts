import { ApiProperty } from '@nestjs/swagger';
import { TaskType } from '../../../common/types';

export const CreateTaskDtoSchema = {
  schema: {
    type: 'object',
    properties: {
      title: { type: 'string', example: 'Comprar pão' },
      type: { type: 'string', example: 'PERSONAL' },
      completed: { type: 'boolean', example: false },
    },
    required: ['title'],
  },
};

export class CreateTaskDto {
  @ApiProperty({ example: 'Comprar pão', description: 'Título da tarefa' })
  title: string;
  @ApiProperty({ example: 'PERSONAL', description: 'Tipo da tarefa' })
  type: TaskType;
  @ApiProperty({
    example: false,
    description: 'Status de conclusão',
    required: false,
  })
  completed?: boolean;
  constructor(
    title: string,
    type: TaskType = TaskType.PERSONAL,
    completed: boolean = false,
  ) {
    this.title = title;
    this.type = type || TaskType.PERSONAL;
    this.completed = completed;
  }
}
