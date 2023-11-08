import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

import { useSnackBar } from '@/ui/feedback/snack-bar/hooks/useSnackBar';
import { logError } from '~/utils/logError';

import { ObjectMetadataItemIdentifier } from '../types/ObjectMetadataItemIdentifier';
import { PaginatedObjectType } from '../types/PaginatedObjectType';
import { PaginatedObjectTypeResults } from '../types/PaginatedObjectTypeResults';
import { formatPagedObjectsToObjects } from '../utils/formatPagedObjectsToObjects';

import { useFindOneObjectMetadataItem } from './useFindOneObjectMetadataItem';

// TODO: test with a wrong name
// TODO: add zod to validate that we have at least id on each object
export const useFindManyObjects = <
  ObjectType extends { id: string } & Record<string, any>,
>({
  objectNamePlural,
  filter,
  orderBy,
  onCompleted,
  skip,
}: Pick<ObjectMetadataItemIdentifier, 'objectNamePlural'> & {
  filter?: any;
  orderBy?: any;
  onCompleted?: (data: PaginatedObjectTypeResults<ObjectType>) => void;
  skip?: boolean;
}) => {
  const { foundObjectMetadataItem, objectNotFoundInMetadata, findManyQuery } =
    useFindOneObjectMetadataItem({
      objectNamePlural,
      skip,
    });

  const { enqueueSnackBar } = useSnackBar();

  const { data, loading, error } = useQuery<PaginatedObjectType<ObjectType>>(
    findManyQuery,
    {
      skip: skip || !foundObjectMetadataItem,
      variables: {
        filter: filter ?? {},
        orderBy: orderBy ?? {},
      },
      onCompleted: (data) =>
        objectNamePlural && onCompleted?.(data[objectNamePlural]),
      onError: (error) => {
        logError(
          `useFindManyObjects for "${objectNamePlural}" error : ` + error,
        );
        enqueueSnackBar(
          `Error during useFindManyObjects for "${objectNamePlural}", ${error.message}`,
          {
            variant: 'error',
          },
        );
      },
    },
  );

  const objects = useMemo(
    () =>
      objectNamePlural
        ? formatPagedObjectsToObjects({
            pagedObjects: data,
            objectNamePlural,
          })
        : [],
    [data, objectNamePlural],
  );

  return {
    objects,
    loading,
    error,
    objectNotFoundInMetadata,
  };
};
