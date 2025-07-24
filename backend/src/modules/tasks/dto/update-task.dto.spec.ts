import { TaskType } from '../../../common/types';
import { UpdateTaskDto } from './update-task.dto';
describe('UpdateTaskDto', () => {
  it('should be defined', () => {
    const task = new UpdateTaskDto(
      '12345',
      'Comprar pão',
      TaskType.PERSONAL,
      false,
    );
    expect(task).toBeDefined();
  });
  it('should set type to PERSONAL if type is undefined', () => {
    const dto = new UpdateTaskDto('12345', 'Comprar pão', undefined, false);
    expect(dto.type).toBe(TaskType.PERSONAL);
  });
});
