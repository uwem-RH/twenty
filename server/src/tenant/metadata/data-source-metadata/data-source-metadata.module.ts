import { Module } from '@nestjs/common';

import { DataSourceMetadataService } from './data-source-metadata.service';

@Module({
  providers: [DataSourceMetadataService],
  exports: [DataSourceMetadataService],
})
export class DataSourceMetadataModule {}
