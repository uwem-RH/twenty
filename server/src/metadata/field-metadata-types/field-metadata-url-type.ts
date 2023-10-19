import { v4 } from 'uuid';
import { GraphQLInputObjectType, GraphQLString } from 'graphql';

import { uuidToBase36 } from 'src/metadata/data-source/data-source.util';
import { TenantMigrationColumnAction } from 'src/metadata/tenant-migration/tenant-migration.entity';
import { FieldMetadataTargetColumnMap } from 'src/metadata/field-metadata/field-metadata.entity';
import { UrlFilterType } from 'src/tenant/schema-builder/graphql-types/input/url-filter.type';

import { FieldMetadataType } from './field-metadata-type';

export class FieldMetadataUrlType implements FieldMetadataType {
  public toString() {
    return 'url';
  }

  public toTargetColumnMap(): FieldMetadataTargetColumnMap {
    return {
      text: `column_${uuidToBase36(v4())}`,
      link: `column_${uuidToBase36(v4())}`,
    };
  }

  public toTenantMigrationColumnActions(
    targetColumnMap: any,
  ): TenantMigrationColumnAction[] {
    return [
      {
        name: targetColumnMap.text,
        action: 'create',
        type: 'varchar',
      },
      {
        name: targetColumnMap.link,
        action: 'create',
        type: 'varchar',
      },
    ];
  }

  public toGraphQLInputObjectType(): GraphQLInputObjectType {
    return UrlFilterType;
  }

  public toGraphQLType(): any {
    return GraphQLString;
  }
}
