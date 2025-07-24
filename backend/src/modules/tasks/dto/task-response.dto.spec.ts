import { TaskResponseDto } from './task-response.dto';
import { TaskType } from '../../../common/types';
describe('TaskResponseDto', () => {
  it('should be defined', () => {
    expect(
      new TaskResponseDto(
        '12345',
        'Comprar pão',
        false,
        TaskType.PERSONAL,
        new Date(),
        new Date(),
      ),
    ).toBeDefined();
  });
  it('should set type to PERSONAL if type is undefined', () => {
    const dto = new TaskResponseDto(
      '12345',
      'Comprar pão',
      false,
      undefined,
      new Date(),
      new Date(),
    );
    expect(dto.type).toBe(TaskType.PERSONAL);
  });
});
