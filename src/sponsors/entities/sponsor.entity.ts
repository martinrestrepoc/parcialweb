import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sponsor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company_name: string;

  @Column('text')
  donated_items: string;

  @Column()
  preferred_fighter: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'sponsor' })
  role: string;
}
