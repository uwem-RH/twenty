/**
 * Map the column type from field-metadata to its corresponding filter type.
 * @param columnType Type of the column in the database.
 */
// export const mapColumnTypeToFilterType = (column: FieldMetadata) => {
//   switch (column.type) {
//     case 'uuid':
//       return UUIDFilterType;
//     case 'text':
//     case 'phone':
//     case 'email':
//       return StringFilterType;
//     case 'date':
//       return DateFilterType;
//     case 'boolean':
//       return GraphQLBoolean;
//     case 'number':
//       return IntFilter;
//     case 'url': {
//       return UrlFilterType;
//     }
//     case 'money': {
//       return MoneyFilterType;
//     }
//     case 'enum':
//     default:
//       throw new Error(`${column.type} filter type not yet implemented`);
//   }
// };
