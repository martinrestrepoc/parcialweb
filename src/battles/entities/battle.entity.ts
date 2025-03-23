import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Battle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  contestant_1: string;

  @Column()
  contestant_2: string;

  @Column({ nullable: true })
  winner_id: string;

  @Column()
  death_occurred: boolean;

  @Column()
  injuries: string;

  @Column()
  kills: number;

  @Column()
  betrayals: number;

  @Column()
  date: Date;

  @Column("simple-array", { nullable: true })
  bets: string[]; // IDs de dictadores que apostaron
}