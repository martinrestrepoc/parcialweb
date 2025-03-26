// src/dictators/entities/dictator.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Contestant } from '../../contestants/entities/contestant.entity';

@Entity()
export class Dictator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  territory: string;

  @Column()
  number_of_slaves: number;

  @Column()
  loyalty_to_Carolina: number;

  @Column('simple-array', { default: '' })
  special_events: string[];

  @OneToMany(() => Contestant, (contestant) => contestant.dictator)
  contestants: Contestant[];

  @Column({ unique: true }) 
  email: string;

  @Column() 
  password: string;

  @Column({ default: 'dictator' }) 
  role: string;
}

