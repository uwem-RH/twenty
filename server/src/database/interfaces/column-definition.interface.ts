export interface ColumnDefinition {
  name: string;
  type: string;
  isPrimary?: boolean;
  default?: string;
  isNullable?: boolean;
}
