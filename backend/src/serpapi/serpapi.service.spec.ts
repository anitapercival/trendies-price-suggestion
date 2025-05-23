import { Test, TestingModule } from '@nestjs/testing';
import { SerpapiService } from './serpapi.service';

describe('SerpapiService', () => {
  let service: SerpapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SerpapiService],
    }).compile();

    service = module.get<SerpapiService>(SerpapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
