import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class DataSourceMetadataService {
  constructor(private readonly prismaService: PrismaService) {}

  async createDataSourceMetadata(workspaceId: string, workspaceSchema: string) {
    // TODO: Double check if this is the correct way to do this
    const dataSource =
      await this.prismaService.client.dataSourceMetadata.findFirst({
        where: { workspaceId },
      });

    if (dataSource) {
      return dataSource;
    }

    return this.prismaService.client.dataSourceMetadata.create({
      data: {
        workspaceId,
        schema: workspaceSchema,
      },
    });
  }

  getDataSourcesMetadataFromWorkspaceId(workspaceId: string) {
    return this.prismaService.client.dataSourceMetadata.findMany({
      where: { workspaceId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
