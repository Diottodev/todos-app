import { ApiProperty } from '@nestjs/swagger';
import { TaskType } from '../../../common/types';

export class TaskResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  type: TaskType;

  @ApiProperty()
  completed: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
  constructor(
    id: string,
    title: string,
    completed: boolean,
    type: TaskType = TaskType.PERSONAL,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.type = type || TaskType.PERSONAL;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
