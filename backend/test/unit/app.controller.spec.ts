import { AppController } from '../../src/app.controller';
import { AppService } from '../../src/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(() => {
    appController = new AppController({
      get: () => 'Hello',
    } as AppService);
  });

  it('should return health ok', () => {
    expect(appController.healthCheck()).toEqual({ status: 'ok' });
  });
});
