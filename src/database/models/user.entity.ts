import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity as OrmEntity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { getEnv } from '../../common/utils/env';

@OrmEntity({ name: 'tb_user', schema: getEnv('DB_SCHEMA') })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_user', type: 'bigint' })
  idUser!: number;

  @Column({ type: 'varchar', length: 100, name: 'nm_user', nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: 100, name: 'tx_secret', nullable: true })
  secret?: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'ts_insert_timestamp',
    default: () => 'now()',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'ts_update_timestamp',
    nullable: true,
  })
  updatedAt?: Date;
}
