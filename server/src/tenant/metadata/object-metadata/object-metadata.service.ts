import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ObjectMetadataService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getObjectMetadataFromDataSourceId(dataSourceId: string) {
    return this.prismaService.client.objectMetadata.findFirst({
      where: { dataSourceId },
      include: {
        fields: true,
      },
    });
  }

  public async getObjectMetadataFromId(objectMetadataId: string) {
    return this.prismaService.client.objectMetadata.findFirst({
      where: { id: objectMetadataId },
      include: {
        fields: true,
      },
    });
  }
}
