import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sponsor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company_name: string;

  @Column('text')
  donated_items: string; // Lista de objetos donados

  @Column()
  preferred_fighter: string; // UUID del concursante apoyado
}
