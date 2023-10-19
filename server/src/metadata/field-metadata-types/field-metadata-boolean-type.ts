import { v4 } from 'uuid';
import { GraphQLBoolean, GraphQLInputObjectType } from 'graphql';

import { uuidToBase36 } from 'src/metadata/data-source/data-source.util';
import { TenantMigrationColumnAction } from 'src/metadata/tenant-migration/tenant-migration.entity';
import { FieldMetadataTargetColumnMap } from 'src/metadata/field-metadata/field-metadata.entity';

import { FieldMetadataType } from './field-metadata-type';

export class FieldMetadataBooleanType implements FieldMetadataType {
  public toString() {
    return 'boolean';
  }

  public toTargetColumnMap(): FieldMetadataTargetColumnMap {
    return {
      value: `column_${uuidToBase36(v4())}`,
    };
  }

  public toTenantMigrationColumnActions(
    targetColumnMap: any,
  ): TenantMigrationColumnAction[] {
    return [
      {
        name: targetColumnMap.value,
        action: 'create',
        type: 'boolean',
      },
    ];
  }

  public toGraphQLInputObjectType(): GraphQLInputObjectType {
    throw new Error('Method not implemented.');
  }

  public toGraphQLType(): any {
    return GraphQLBoolean;
  }
}
