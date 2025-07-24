import { ApiProperty } from '@nestjs/swagger';
import { TaskType } from '../../../common/types';

export const UpdateTaskDtoSchema = {
  schema: {
    type: 'object',
    properties: {
      id: { type: 'string', example: '12345', description: 'ID da tarefa' },
      title: { type: 'string', example: 'Comprar pão', nullable: true },
      type: { type: 'string', example: 'PERSONAL', nullable: true },
      completed: { type: 'boolean', example: true, nullable: false },
    },
  },
};
export class UpdateTaskDto {
  @ApiProperty({ example: '12345', description: 'ID da tarefa' })
  id: string;
  @ApiProperty({ example: 'Comprar pão', description: 'Título da tarefa' })
  title: string;
  @ApiProperty({
    example: 'Ir à padaria e comprar pão francês',
    description: 'Descrição detalhada da tarefa',
  })
  @ApiProperty({ example: 'PERSONAL', description: 'Tipo da tarefa' })
  type: TaskType;
  @ApiProperty({
    example: false,
    description: 'Status de conclusão',
    required: false,
  })
  completed: boolean;
  constructor(
    id: string,
    title: string,
    type: TaskType = TaskType.PERSONAL,
    completed: boolean = false,
  ) {
    this.id = id;
    this.title = title;
    this.type = type || TaskType.PERSONAL;
    this.completed = completed;
  }
}
