import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';

import { generateColumnName } from './field-metadata.util';

@Injectable()
export class FieldMetadataService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createFieldMetadata(
    name: string,
    type: string,
    objectId: string,
    workspaceId: string,
  ) {
    return this.prismaService.client.fieldMetadata.create({
      data: {
        displayName: name,
        type,
        objectId,
        isCustom: true,
        targetColumnName: generateColumnName(name),
        workspaceId,
      },
    });
  }

  public async getFieldMetadataByNameAndObjectId(
    name: string,
    objectId: string,
  ) {
    return this.prismaService.client.fieldMetadata.findFirst({
      where: { displayName: name, objectId },
    });
  }
}
