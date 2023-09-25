import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

import { Prisma, PrismaClient } from '@prisma/client';
import { createPrismaQueryEventHandler } from 'prisma-query-log';

import { EnvironmentService } from 'src/integrations/environment/environment.service';

import { TableDefinition } from './interfaces/table-definition.interface';

// Prepare Prisma extenstion ability
const createPrismaClient = (options: Prisma.PrismaClientOptions) => {
  const client = new PrismaClient(options);

  return client;
};

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private prismaClient!: ExtendedPrismaClient;

  public get client(): ExtendedPrismaClient {
    return this.prismaClient;
  }

  constructor(private readonly environmentService: EnvironmentService) {
    const debugMode = environmentService.isDebugMode();

    this.prismaClient = createPrismaClient({
      errorFormat: 'minimal',
      log: debugMode
        ? [
            {
              level: 'query',
              emit: 'event',
            },
          ]
        : undefined,
    });

    if (debugMode) {
      const logHandler = createPrismaQueryEventHandler({
        logger: (query: string) => {
          this.logger.log(query, 'PrismaClient');
        },
        format: false,
        colorQuery: '\u001B[96m',
        colorParameter: '\u001B[90m',
      });

      this.prismaClient.$on('query' as any, logHandler);
    }
  }

  async createSchema(schemaName: string): Promise<void> {
    await this.prismaClient.$queryRaw`CREATE SCHEMA ${schemaName}`;
  }

  async hasSchema(schemaName: string): Promise<boolean> {
    const result = await this.prismaClient.$queryRaw<
      string[]
    >`SELECT schema_name FROM information_schema.schemata WHERE schema_name = ${schemaName}`;

    return result.length > 0;
  }

  async runOnSchema(schemaName: string): Promise<void> {
    await this.prismaClient.$queryRaw`SET search_path TO ${schemaName};`;
  }

  async createTableFromDefinition(tableDef: TableDefinition) {
    const columnsSQL = tableDef.columns
      .map((column) => {
        let columnDef = `${column.name} ${column.type}`;
        if (column.isPrimary) columnDef += ' PRIMARY KEY';
        if (column.default) columnDef += ` DEFAULT ${column.default}`;
        if (column.isNullable) columnDef += ' NULL';
        else columnDef += ' NOT NULL';
        return columnDef;
      })
      .join(', ');

    const tableName = tableDef.schema
      ? `${tableDef.schema}.${tableDef.name}`
      : tableDef.name;
    const ifNotExistsClause = tableDef.ifNotExists ? 'IF NOT EXISTS' : '';

    try {
      await this.prismaClient
        .$executeRaw`CREATE TABLE ${ifNotExistsClause} ${tableName} (${columnsSQL})`;
    } catch (error) {
      console.error('Error creating table:', error);
      throw error;
    }
  }

  async onModuleInit(): Promise<void> {
    await this.prismaClient.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.prismaClient.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.prismaClient.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
