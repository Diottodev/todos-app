/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from '../../src/modules/database/prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(() => {
    service = new PrismaService();
  });

  it('should connect on module init', async () => {
    const connectSpy = jest.spyOn(service, '$connect').mockResolvedValue();
    await service.onModuleInit();
    expect(connectSpy).toHaveBeenCalled();
  });

  it('should enable shutdown hooks', () => {
    const closeMock = jest.fn();
    const app = { close: closeMock } as any;
    const onSpy = jest.spyOn(service, '$on').mockImplementation((event, cb) => {
      if (event === 'beforeExit') cb([] as never);
    });
    service.enableShutdownHooks(app);
    expect(onSpy).toHaveBeenCalledWith('beforeExit', expect.any(Function));
    expect(closeMock).toHaveBeenCalled();
  });
});
