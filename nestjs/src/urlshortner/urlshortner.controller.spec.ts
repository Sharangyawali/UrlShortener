import { Test, TestingModule } from '@nestjs/testing';
import { UrlshortnerController } from './urlshortner.controller';

describe('UrlshortnerController', () => {
  let controller: UrlshortnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlshortnerController],
    }).compile();

    controller = module.get<UrlshortnerController>(UrlshortnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
