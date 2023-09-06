import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ObjectMetaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isActive: boolean;
}
