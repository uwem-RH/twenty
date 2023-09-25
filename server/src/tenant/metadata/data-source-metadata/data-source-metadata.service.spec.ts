import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from 'src/database/prisma.service';

import { DataSourceMetadataService } from './data-source-metadata.service';

describe('DataSourceMetadataService', () => {
  let service: DataSourceMetadataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSourceMetadataService,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<DataSourceMetadataService>(DataSourceMetadataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
