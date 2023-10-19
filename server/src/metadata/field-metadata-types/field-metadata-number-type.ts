import { v4 } from 'uuid';
import { GraphQLInputObjectType, GraphQLInt } from 'graphql';

import { uuidToBase36 } from 'src/metadata/data-source/data-source.util';
import { TenantMigrationColumnAction } from 'src/metadata/tenant-migration/tenant-migration.entity';
import { FieldMetadataTargetColumnMap } from 'src/metadata/field-metadata/field-metadata.entity';
import { IntFilter } from 'src/tenant/schema-builder/graphql-types/input/int-filter.type';

import { FieldMetadataType } from './field-metadata-type';

export class FieldMetadataNumberType implements FieldMetadataType {
  public toString() {
    return 'number';
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
        type: 'integer',
      },
    ];
  }

  public toGraphQLInputObjectType(): GraphQLInputObjectType {
    return IntFilter;
  }

  public toGraphQLType(): any {
    return GraphQLInt;
  }
}
