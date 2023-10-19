import { v4 } from 'uuid';
import { GraphQLInputObjectType, GraphQLString } from 'graphql';

import { uuidToBase36 } from 'src/metadata/data-source/data-source.util';
import { TenantMigrationColumnAction } from 'src/metadata/tenant-migration/tenant-migration.entity';
import { FieldMetadataTargetColumnMap } from 'src/metadata/field-metadata/field-metadata.entity';
import { StringFilterType } from 'src/tenant/schema-builder/graphql-types/input/string-filter.type';

import { FieldMetadataType } from './field-metadata-type';

export class FieldMetadataPhoneType implements FieldMetadataType {
  public toString() {
    return 'phone';
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
        type: 'varchar',
      },
    ];
  }

  public toGraphQLInputObjectType(): GraphQLInputObjectType {
    return StringFilterType;
  }

  public toGraphQLType(): any {
    return GraphQLString;
  }
}
