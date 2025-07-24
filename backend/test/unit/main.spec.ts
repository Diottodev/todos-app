/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as nestCore from '@nestjs/core';
import * as swagger from '@nestjs/swagger';
import { AppModule } from '../../src/app.module';

describe('main bootstrap', () => {
  it('should bootstrap without error', async () => {
    const createMock = jest
      .spyOn(nestCore.NestFactory, 'create')
      .mockResolvedValue({
        listen: jest.fn(),
      } as any);
    const createDocMock = jest
      .spyOn(swagger.SwaggerModule, 'createDocument')
      .mockReturnValue({} as any);
    const setupMock = jest
      .spyOn(swagger.SwaggerModule, 'setup')
      .mockImplementation();
    const logMock = jest.spyOn(console, 'log').mockImplementation();
    process.env.PORT = '8080';
    await import('../../src/main');
    expect(createMock).toHaveBeenCalledWith(AppModule);
    expect(createDocMock).toHaveBeenCalled();
    expect(setupMock).toHaveBeenCalled();
    expect(logMock).toHaveBeenCalled();
  });
});
