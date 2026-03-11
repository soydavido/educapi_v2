import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('request_logs')
export class RequestLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  endpoint: string;

  @Column({ length: 100 })
  ip: string;

  @Column({ type: 'text', nullable: true })
  body: string;

  @Column({ type: 'text', nullable: true })
  method: string;

  @Column({ name: 'usersecretpasskey', length: 255, nullable: true })
  userSecretPasskey: string;

  @Column({ length: 255, nullable: true })
  hostname: string;

  @Column({ length: 255, nullable: true })
  direction: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdat: Date;
}
