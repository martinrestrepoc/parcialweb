import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dictator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Nombre del dictador

  @Column()
  territory: string; // Territorio que gobierna

  @Column()
  number_of_slaves: number; // Número de esclavos que posee

  @Column()
  loyalty_to_Carolina: number; // Nivel de lealtad (1-100)
}