// Update with the actual path

// describe('mapColumnTypeToFilterType', () => {
//   it('should map column types to corresponding filter types', () => {
//     const fields: { column: FieldMetadata; expected: any }[] = [
//       { column: { type: 'uuid' } as FieldMetadata, expected: UUIDFilterType },
//       { column: { type: 'text' } as FieldMetadata, expected: StringFilterType },
//       {
//         column: { type: 'phone' } as FieldMetadata,
//         expected: StringFilterType,
//       },
//       {
//         column: { type: 'email' } as FieldMetadata,
//         expected: StringFilterType,
//       },
//       { column: { type: 'date' } as FieldMetadata, expected: DateFilterType },
//       {
//         column: { type: 'boolean' } as FieldMetadata,
//         expected: GraphQLBoolean,
//       },
//       { column: { type: 'number' } as FieldMetadata, expected: IntFilter },
//       { column: { type: 'url' } as FieldMetadata, expected: UrlFilterType },
//       { column: { type: 'money' } as FieldMetadata, expected: MoneyFilterType },
//     ];

//     fields.forEach((field) => {
//       expect(mapColumnTypeToFilterType(field.column)).toBe(field.expected);
//     });
//   });

//   it('should throw an error for unimplemented filter types', () => {
//     const column = { type: 'enum' } as FieldMetadata;

//     expect(() => mapColumnTypeToFilterType(column)).toThrowError(
//       'enum filter type not yet implemented',
//     );
//   });
// });
