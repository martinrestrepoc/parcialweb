import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  loyalty_to_Carolina: number; // 1-100
}