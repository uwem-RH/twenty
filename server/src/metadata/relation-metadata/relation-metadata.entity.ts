import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type RelationMetadataTargetColumnMap = {
  from: string;
  to: string;
};

export type RelationType = 'one-to-one' | 'one-to-many' | 'many-to-many';

@Entity('relation_metadata')
export class RelationMetadata {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  objectId: string;

  @Column({ nullable: false })
  type: RelationType;

  @Column({ nullable: false, type: 'jsonb' })
  targetColumnMap: RelationMetadataTargetColumnMap;

  @Column({ nullable: false })
  workspaceId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
