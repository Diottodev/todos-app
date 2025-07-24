import { CreateTaskDto } from './create-task.dto';
import { TaskType } from '../../../common/types';
describe('CreateTaskDto', () => {
  it('should be defined', () => {
    expect(
      new CreateTaskDto('Test Task', TaskType.PERSONAL, false),
    ).toBeDefined();
  });
  it('should set type to PERSONAL if type is undefined', () => {
    const dto = new CreateTaskDto('Test Task', undefined, false);
    expect(dto.type).toBe(TaskType.PERSONAL);
  });
});
