import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from 'src/database/prisma.service';

import { FieldMetadataService } from './field-metadata.service';

describe('FieldMetadataService', () => {
  let service: FieldMetadataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FieldMetadataService,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<FieldMetadataService>(FieldMetadataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
