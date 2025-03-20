import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Battle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  contestant_1: string; // UUID del primer concursante

  @Column()
  contestant_2: string; // UUID del segundo concursante

  @Column({ nullable: true })
  winner_id: string; // UUID del ganador

  @Column()
  death_occurred: boolean;

  @Column()
  injuries: string;

  @Column()
  date: Date;
}