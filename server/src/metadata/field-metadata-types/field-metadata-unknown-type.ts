import { GraphQLInputObjectType } from 'graphql';

import { TenantMigrationColumnAction } from 'src/metadata/tenant-migration/tenant-migration.entity';
import { FieldMetadataTargetColumnMap } from 'src/metadata/field-metadata/field-metadata.entity';

import { FieldMetadataType } from './field-metadata-type';

export class FieldMetadataUnknownType implements FieldMetadataType {
  public toString() {
    return '';
  }

  public toTargetColumnMap(): FieldMetadataTargetColumnMap {
    throw new Error('Unknown field type');
  }

  public toTenantMigrationColumnActions(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    targetColumnMap: any,
  ): TenantMigrationColumnAction[] {
    throw new Error('Unknown field type');
  }

  public toGraphQLInputObjectType(): GraphQLInputObjectType {
    throw new Error('Unknown field type');
  }

  public toGraphQLType(): any {
    throw new Error('Unknown field type');
  }
}
