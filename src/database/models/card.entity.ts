import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity as OrmEntity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { getEnv } from '../../common/utils/env';

@OrmEntity({ name: 'tb_cards', schema: getEnv('DB_SCHEMA') })
export class CardEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_card', type: 'bigint' })
  idCard!: number;

  @Column({ type: 'varchar', length: 100, name: 'nb_name', nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 500, name: 'tx_description', nullable: true })
  description?: string;

  @Column({ type: 'int', name: 'nu_attack', default: 0 })
  attack!: number;

  @Column({ type: 'int', name: 'nu_defense', default: 0 })
  defense!: number;

  @Column({ type: 'int', name: 'nu_life_points', default: 0 })
  lifePoints!: number;

  @Column({ type: 'varchar', length: 1000, name: 'tx_picture_url', nullable: true })
  pictureUrl?: string;

  @Column({ type: 'jsonb', name: 'js_attributes', nullable: true })
  attributes?: any;

  @Column({ type: 'varchar', length: 100, name: 'tx_user_secret', nullable: true })
  userSecret?: string;

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
