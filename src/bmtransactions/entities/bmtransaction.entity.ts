import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BlackMarketTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  buyer_id: string; // UUID del comprador

  @Column()
  seller_id: string; // UUID del vendedor

  @Column()
  item: string; // Ejemplo: "dagger", "poison", "bribe"

  @Column('decimal')
  amount: number; // Precio pagado

  @Column({
    type: 'enum',
    enum: ['Completed', 'Failed', 'Discovered'],
  })
  status: 'Completed' | 'Failed' | 'Discovered';
}