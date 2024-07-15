import { Test, TestingModule } from '@nestjs/testing';
import { UrlshortnerService } from './urlshortner.service';

describe('UrlshortnerService', () => {
  let service: UrlshortnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlshortnerService],
    }).compile();

    service = module.get<UrlshortnerService>(UrlshortnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
