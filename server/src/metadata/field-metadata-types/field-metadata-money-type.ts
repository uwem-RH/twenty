import { v4 } from 'uuid';
import { GraphQLInputObjectType, GraphQLString } from 'graphql';

import { uuidToBase36 } from 'src/metadata/data-source/data-source.util';
import { TenantMigrationColumnAction } from 'src/metadata/tenant-migration/tenant-migration.entity';
import { FieldMetadataTargetColumnMap } from 'src/metadata/field-metadata/field-metadata.entity';
import { MoneyFilterType } from 'src/tenant/schema-builder/graphql-types/input/money-filter.type';

import { FieldMetadataType } from './field-metadata-type';

export class FieldMetadataMoneyType implements FieldMetadataType {
  public toString() {
    return 'money';
  }

  public toTargetColumnMap(): FieldMetadataTargetColumnMap {
    return {
      amount: `column_${uuidToBase36(v4())}`,
      currency: `column_${uuidToBase36(v4())}`,
    };
  }

  public toTenantMigrationColumnActions(
    targetColumnMap: any,
  ): TenantMigrationColumnAction[] {
    return [
      {
        name: targetColumnMap.amount,
        action: 'create',
        type: 'integer',
      },
      {
        name: targetColumnMap.currency,
        action: 'create',
        type: 'varchar',
      },
    ];
  }

  public toGraphQLInputObjectType(): GraphQLInputObjectType {
    return MoneyFilterType;
  }

  public toGraphQLType(): any {
    return GraphQLString;
  }
}
