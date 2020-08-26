import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_metrics')
export class SysMetrics {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  date?: Date;

  @Column('double')
  temperature?: number;
}
