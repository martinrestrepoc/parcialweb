import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Dictator } from '../../dictators/entities/dictator.entity';

@Entity()
export class Contestant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  origin: string;

  @Column()
  strength: number;

  @Column()
  agility: number;

  @Column()
  wins: number;

  @Column()
  losses: number;

  @Column({
    type: 'enum',
    enum: ['Alive', 'Dead', 'Escaped', 'Free'],
  })
  status: 'Alive' | 'Dead' | 'Escaped' | 'Free';

  @Column()
  rank: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'contestant' })
  role: string;

  @ManyToOne(() => Dictator, (dictator) => dictator.contestants)
  dictator: Dictator;
}
