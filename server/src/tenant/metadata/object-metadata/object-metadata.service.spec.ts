import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from 'src/database/prisma.service';

import { ObjectMetadataService } from './object-metadata.service';

describe('ObjectMetadataService', () => {
  let service: ObjectMetadataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObjectMetadataService,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ObjectMetadataService>(ObjectMetadataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
