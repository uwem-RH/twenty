-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "metadata";

-- CreateTable
CREATE TABLE "metadata"."data_source_metadata" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "schema" TEXT,
    "type" TEXT NOT NULL DEFAULT 'postgres',
    "displayName" TEXT,
    "isRemote" BOOLEAN NOT NULL DEFAULT false,
    "workspaceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "data_source_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metadata"."field_metadata" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "targetColumnName" TEXT NOT NULL,
    "isCustom" BOOLEAN NOT NULL DEFAULT false,
    "workspaceId" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "field_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metadata"."object_metadata" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "targetTableName" TEXT NOT NULL,
    "isCustom" BOOLEAN NOT NULL DEFAULT false,
    "workspaceId" TEXT NOT NULL,
    "dataSourceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "object_metadata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "metadata"."data_source_metadata" ADD CONSTRAINT "data_source_metadata_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metadata"."field_metadata" ADD CONSTRAINT "field_metadata_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metadata"."field_metadata" ADD CONSTRAINT "field_metadata_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "metadata"."object_metadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metadata"."object_metadata" ADD CONSTRAINT "object_metadata_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metadata"."object_metadata" ADD CONSTRAINT "object_metadata_dataSourceId_fkey" FOREIGN KEY ("dataSourceId") REFERENCES "metadata"."data_source_metadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
