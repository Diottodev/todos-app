import { RegisterDto } from './register.dto';
describe('RegisterDto', () => {
  it('should be defined', () => {
    expect(
      new RegisterDto('Test User', 'test@example.com', 'test12345'),
    ).toBeDefined();
  });
});
