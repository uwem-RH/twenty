import { Injectable } from '@nestjs/common';

import { GraphQLFieldConfigMap, GraphQLObjectType } from 'graphql';

import { BuildSchemaOptions } from 'src/tenant/schema-builder/interfaces/build-schema-optionts.interface';
import { ObjectMetadataInterface } from 'src/tenant/schema-builder/interfaces/object-metadata.interface';

import { pascalCase } from 'src/utils/pascal-case';
import { isCompositeFieldMetadataType } from 'src/tenant/schema-builder/utils/is-composite-field-metadata-type.util';

import { OutputTypeFactory } from './output-type.factory';

export enum ObjectTypeDefinitionKind {
  Connection = 'Connection',
  Edge = 'Edge',
  Plain = '',
}

export interface ObjectTypeDefinition {
  target: string;
  kind: ObjectTypeDefinitionKind;
  type: GraphQLObjectType;
}

@Injectable()
export class ObjectTypeDefinitionFactory {
  constructor(private readonly outputTypeFactory: OutputTypeFactory) {}

  public create(
    objectMetadata: ObjectMetadataInterface,
    kind: ObjectTypeDefinitionKind,
    options: BuildSchemaOptions,
  ): ObjectTypeDefinition {
    return {
      target: objectMetadata.id,
      kind,
      type: new GraphQLObjectType({
        name: `${pascalCase(objectMetadata.nameSingular)}${kind.toString()}`,
        description: objectMetadata.description,
        fields: this.generateFields(objectMetadata, kind, options),
      }),
    };
  }

  private generateFields(
    objectMetadata: ObjectMetadataInterface,
    kind: ObjectTypeDefinitionKind,
    options: BuildSchemaOptions,
  ): GraphQLFieldConfigMap<any, any> {
    const fields: GraphQLFieldConfigMap<any, any> = {};

    for (const fieldMetadata of objectMetadata.fields) {
      // Composite field types are generated during extensin of object type definition
      if (isCompositeFieldMetadataType(fieldMetadata.type)) {
        continue;
      }

      const type = this.outputTypeFactory.create(fieldMetadata, kind, options, {
        nullable: fieldMetadata.isNullable,
      });

      fields[fieldMetadata.name] = {
        type,
        description: fieldMetadata.description,
      };
    }

    return fields;
  }
}
