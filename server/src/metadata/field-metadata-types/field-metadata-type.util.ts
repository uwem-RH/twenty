import { FieldMetadataBooleanType } from './field-metadata-boolean-type';
import { FieldMetadataDateType } from './field-metadata-date-type';
import { FieldMetadataEmailType } from './field-metadata-email-type';
import { FieldMetadataMoneyType } from './field-metadata-money-type';
import { FieldMetadataNumberType } from './field-metadata-number-type';
import { FieldMetadataPhoneType } from './field-metadata-phone-type';
import { FieldMetadataTextType } from './field-metadata-text-type';
import { FieldMetadataType } from './field-metadata-type';
import { FieldMetadataUnknownType } from './field-metadata-unknown-type';
import { FieldMetadataUrlType } from './field-metadata-url-type';

export function convertTypeToFieldMetadataType(
  type: string,
): FieldMetadataType {
  switch (type) {
    case 'boolean':
      return new FieldMetadataBooleanType();
    case 'date':
      return new FieldMetadataDateType();
    case 'email':
      return new FieldMetadataEmailType();
    case 'money':
      return new FieldMetadataMoneyType();
    case 'number':
      return new FieldMetadataNumberType();
    case 'phone':
      return new FieldMetadataPhoneType();
    case 'text':
      return new FieldMetadataTextType();
    case 'url':
      return new FieldMetadataUrlType();
    default:
      return new FieldMetadataUnknownType();
  }
}
