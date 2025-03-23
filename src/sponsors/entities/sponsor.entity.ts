import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sponsor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company_name: string;

  @Column('text')
  donated_items: string; // Lista de objetos donados como texto

  @Column()
  preferred_fighter: string; // UUID del concursante que apoya
}