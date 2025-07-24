import { AppService } from '../../src/app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    service = new AppService();
  });

  it('should return "Server is running"', () => {
    expect(service.get()).toBe('Server is running');
  });
});
