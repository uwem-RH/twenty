import { GraphQLInputObjectType } from 'graphql';

import { FieldMetadataTargetColumnMap } from 'src/metadata/field-metadata/field-metadata.entity';
import { TenantMigrationColumnAction } from 'src/metadata/tenant-migration/tenant-migration.entity';

export interface FieldMetadataType {
  toString(): string;

  /**
   * Generate a target column map for a given type, this is used to map the field to the correct column(s) in the database.
   * This is used to support fields that map to multiple columns in the database.
   *
   * @returns FieldMetadataTargetColumnMap
   */
  toTargetColumnMap(): FieldMetadataTargetColumnMap;

  /**
   * Convert to column actions, this is used to create the columns in the database.
   *
   * @param targetColumnMap FieldMetadataTargetColumnMap
   * @returns TenantMigrationColumnAction[]
   */
  toTenantMigrationColumnActions(
    targetColumnMap: FieldMetadataTargetColumnMap,
  ): TenantMigrationColumnAction[];

  /**
   * Map the column type from field-metadata to its corresponding filter type.
   * @param columnType Type of the column in the database.
   */
  toGraphQLInputObjectType(): GraphQLInputObjectType;

  /**
   * Map the column type from field-metadata to its corresponding GraphQL type.
   * @param columnType Type of the column in the database.
   */
  toGraphQLType(): any;
}
