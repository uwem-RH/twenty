import { Record as IRecord } from 'src/tenant/query-builder/interfaces/record.interface';

export interface PGGraphQLResponse<Data = any> {
  resolve: {
    data: Data;
  };
}

export type PGGraphQLResult<Data = any> = [PGGraphQLResponse<Data>];

export interface PGGraphQLMutation<Record = IRecord> {
  affectedRows: number;
  records: Record[];
}
