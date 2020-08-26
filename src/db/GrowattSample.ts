import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('growatt_sample')
export class GrowattSample {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  date?: Date;

  @Column({
    length: 32
  })
  status?: string;

  @Column('double')
  pvVoltage?: number;

  @Column('double')
  pvCurrent?: number;

  @Column('double')
  pvPower?: number;

  @Column('double')
  outputPower?: number;

  @Column('double')
  gridFrequency?: number;

  @Column('double')
  energyToday?: number;

  @Column('double')
  energyTotal?: number;

  @Column('double')
  timeTotal?: number;

  @Column('double')
  temperature?: number;
}
