import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { useSetRecordTableData } from '@/ui/object/record-table/hooks/useSetRecordTableData';
import { availableTableColumnsScopedState } from '@/ui/object/record-table/states/availableTableColumnsScopedState';
import { useView } from '@/views/hooks/useView';
import { ViewType } from '@/views/types/ViewType';

import { useObjectMetadataItemInContext } from '../hooks/useObjectMetadataItemInContext';
import { useTableObjects } from '../hooks/useTableObjects';
import { ObjectMetadataItemIdentifier } from '../types/ObjectMetadataItemIdentifier';

export type RecordTableEffectProps = Pick<
  ObjectMetadataItemIdentifier,
  'objectNamePlural'
>;

// This should be migrated to RecordTable at some point
export const RecordTableEffect = () => {
  const {
    setAvailableSortDefinitions,
    setAvailableFilterDefinitions,
    setAvailableFieldDefinitions,
    setViewType,
    setViewObjectId,
  } = useView();

  const setRecordTableData = useSetRecordTableData();

  const {
    columnDefinitions,
    filterDefinitions,
    sortDefinitions,
    foundObjectMetadataItem,
  } = useObjectMetadataItemInContext();

  const { loading, objects } = useTableObjects();

  // const [fetchMoreObjectsFamily, setFetchMoreObjectsFamily] = useRecoilState(
  //   fetchMoreObjectsFamilyState(objectNamePlural ?? ''),
  // );

  // useEffect(() => {
  //   if (!fetchMoreObjectsFamily) {
  //     console.log({ objectNamePlural, fetchMoreObjects });
  //     setFetchMoreObjectsFamily({ fetchMore: fetchMoreObjects });
  //   }
  // }, [
  //   fetchMoreObjects,
  //   setFetchMoreObjectsFamily,
  //   objectNamePlural,
  //   fetchMoreObjectsFamily,
  // ]);

  useEffect(() => {
    if (!loading) {
      const entities = objects ?? [];

      setRecordTableData(entities);
    }
  }, [objects, setRecordTableData, loading]);

  const tableScopeId = foundObjectMetadataItem?.namePlural ?? '';

  const setAvailableTableColumns = useSetRecoilState(
    availableTableColumnsScopedState(tableScopeId),
  );

  useEffect(() => {
    if (!foundObjectMetadataItem) {
      return;
    }
    setViewObjectId?.(foundObjectMetadataItem.id);
    setViewType?.(ViewType.Table);

    setAvailableSortDefinitions?.(sortDefinitions);
    setAvailableFilterDefinitions?.(filterDefinitions);
    setAvailableFieldDefinitions?.(columnDefinitions);

    setAvailableTableColumns(columnDefinitions);
  }, [
    setAvailableTableColumns,
    setViewObjectId,
    setViewType,
    columnDefinitions,
    setAvailableSortDefinitions,
    setAvailableFilterDefinitions,
    setAvailableFieldDefinitions,
    foundObjectMetadataItem,
    sortDefinitions,
    filterDefinitions,
  ]);

  return <></>;
};
