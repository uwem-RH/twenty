import { ReactNode } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { useLazyLoadIcon } from '@/ui/input/hooks/useLazyLoadIcon';
import { TableCell } from '@/ui/layout/table/components/TableCell';
import { TableRow } from '@/ui/layout/table/components/TableRow';
import { Field } from '~/generated-metadata/graphql';

import { dataTypes } from '../../constants/dataTypes';
import { MetadataFieldDataType } from '../../types/ObjectFieldDataType';

import { SettingsObjectFieldDataType } from './SettingsObjectFieldDataType';

type SettingsObjectFieldItemTableRowProps = {
  ActionIcon: ReactNode;
  fieldItem: Field;
};

export const StyledObjectFieldTableRow = styled(TableRow)`
  grid-template-columns: 180px 148px 148px 36px;
`;

const StyledNameTableCell = styled(TableCell)`
  color: ${({ theme }) => theme.font.color.primary};
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledIconTableCell = styled(TableCell)`
  justify-content: center;
  padding-right: ${({ theme }) => theme.spacing(1)};
`;

// TODO: remove "relation" type for now, add it back when the backend is ready.
const { RELATION: _, ...dataTypesWithoutRelation } = dataTypes;

export const SettingsObjectFieldItemTableRow = ({
  ActionIcon,
  fieldItem,
}: SettingsObjectFieldItemTableRowProps) => {
  const theme = useTheme();
  const { Icon } = useLazyLoadIcon(fieldItem.icon ?? '');

  // TODO: parse with zod and merge types with FieldType (create a subset of FieldType for example)
  const fieldDataTypeIsSupported = Object.keys(
    dataTypesWithoutRelation,
  ).includes(fieldItem.type);

  if (!fieldDataTypeIsSupported) {
    return null;
  }

  return (
    <StyledObjectFieldTableRow>
      <StyledNameTableCell>
        {!!Icon && <Icon size={theme.icon.size.md} />}
        {fieldItem.label}
      </StyledNameTableCell>
      <TableCell>{fieldItem.isCustom ? 'Custom' : 'Standard'}</TableCell>
      <TableCell>
        <SettingsObjectFieldDataType
          value={fieldItem.type as MetadataFieldDataType}
        />
      </TableCell>
      <StyledIconTableCell>{ActionIcon}</StyledIconTableCell>
    </StyledObjectFieldTableRow>
  );
};
