import { ColumnDefinition } from './column-definition.interface';

export interface TableDefinition {
  name: string;
  schema?: string;
  ifNotExists?: boolean;
  columns: ColumnDefinition[];
}
