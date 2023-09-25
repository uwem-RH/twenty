import { Injectable, NotFoundException } from '@nestjs/common';

import { DataSourceMetadataService } from 'src/tenant/metadata/data-source-metadata/data-source-metadata.service';
import { PrismaService } from 'src/database/prisma.service';

import { uuidToBase36 } from './data-source.util';

@Injectable()
export class DataSourceService {
  constructor(
    private readonly dataSourceMetadataService: DataSourceMetadataService,
    private readonly prismaService: PrismaService,
  ) {}

  /**
   * Creates a new schema for a given workspaceId
   * @param workspaceId
   * @returns Promise<void>
   */
  public async createWorkspaceSchema(workspaceId: string): Promise<string> {
    const schemaName = this.getSchemaName(workspaceId);
    const schemaAlreadyExists = await this.prismaService.hasSchema(schemaName);

    if (schemaAlreadyExists) {
      return schemaName;
    }

    await this.prismaService.createSchema(schemaName);
    await this.createMigrationTable(schemaName);

    await this.dataSourceMetadataService.createDataSourceMetadata(
      workspaceId,
      schemaName,
    );

    return schemaName;
  }

  private async createMigrationTable(schemaName: string) {
    await this.prismaService.createTableFromDefinition({
      name: 'tenant_migrations',
      schema: schemaName,
      ifNotExists: true,
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          default: 'uuid_generate_v4()',
        },
        {
          name: 'migrations',
          type: 'jsonb',
        },
        {
          name: 'applied_at',
          type: 'timestamp',
          isNullable: true,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    });
  }

  /**
   * Connects to a workspace data source using the workspace metadata. Returns a cached connection if it exists.
   * @param workspaceId
   */
  public async connectToWorkspaceDataSource(workspaceId: string) {
    const dataSourcesMetadata =
      await this.dataSourceMetadataService.getDataSourcesMetadataFromWorkspaceId(
        workspaceId,
      );

    if (dataSourcesMetadata.length === 0) {
      throw new NotFoundException(
        `We can't find any data source for this workspace id (${workspaceId}).`,
      );
    }

    // We only want the first one for now, we will handle multiple data sources later with remote datasources.
    // However, we will need to differentiate the data sources because we won't run migrations on remote data sources for example.
    const dataSourceMetadata = dataSourcesMetadata[0];
    const schema = dataSourceMetadata.schema;

    // Probably not needed as we will ask for the schema name OR store public by default if it's remote
    if (!schema || !dataSourceMetadata.isRemote) {
      throw Error(
        "No schema found for this non-remote data source, we don't want to fallback to public for workspace data sources.",
      );
    }

    await this.prismaService.runOnSchema(schema);
  }

  /**
   *
   * Returns the schema name for a given workspaceId
   * @param workspaceId
   * @returns string
   */
  public getSchemaName(workspaceId: string): string {
    return `workspace_${uuidToBase36(workspaceId)}`;
  }
}
