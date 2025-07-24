import { LoginDto } from './login.dto';
describe('LoginDto', () => {
  it('should be defined', () => {
    expect(new LoginDto('test@example.com', 'test12345')).toBeDefined();
  });
});
