import { RelationMetadataInterface } from 'src/tenant/schema-builder/interfaces/relation-metadata.interface';

import { RelationMetadataType } from 'src/metadata/relation-metadata/relation-metadata.entity';
import {
  deduceRelationDirection,
  RelationDirection,
} from 'src/tenant/schema-builder/utils/deduce-relation-direction.util';

describe('deduceRelationDirection', () => {
  it('should return FROM when the current object ID matches fromObjectMetadataId', () => {
    const currentObjectId = 'from_object_id';
    const relationMetadata: RelationMetadataInterface = {
      id: 'relation_id',
      fromObjectMetadataId: currentObjectId,
      toObjectMetadataId: 'to_object_id',
      fromFieldMetadataId: 'from_field_id',
      toFieldMetadataId: 'to_field_id',
      type: RelationMetadataType.ONE_TO_ONE,
    };

    const result = deduceRelationDirection(currentObjectId, relationMetadata);

    expect(result).toBe(RelationDirection.FROM);
  });

  it('should return TO when the current object ID matches toObjectMetadataId', () => {
    // Arrange
    const currentObjectId = 'to_object_id';
    const relationMetadata: RelationMetadataInterface = {
      id: 'relation_id',
      fromObjectMetadataId: 'from_object_id',
      toObjectMetadataId: currentObjectId,
      fromFieldMetadataId: 'from_field_id',
      toFieldMetadataId: 'to_field_id',
      type: RelationMetadataType.ONE_TO_ONE,
    };

    const result = deduceRelationDirection(currentObjectId, relationMetadata);

    expect(result).toBe(RelationDirection.TO);
  });

  it('should throw an error when the current object ID does not match any object metadata ID', () => {
    const currentObjectId = 'unrelated_object_id';
    const relationMetadata: RelationMetadataInterface = {
      id: 'relation_id',
      fromObjectMetadataId: 'from_object_id',
      toObjectMetadataId: 'to_object_id',
      fromFieldMetadataId: 'from_field_id',
      toFieldMetadataId: 'to_field_id',
      type: RelationMetadataType.ONE_TO_ONE,
    };

    expect(() =>
      deduceRelationDirection(currentObjectId, relationMetadata),
    ).toThrow(
      `Relation metadata ${relationMetadata.id} is not related to object ${currentObjectId}`,
    );
  });
});
