import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}