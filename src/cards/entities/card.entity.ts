import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cardNumber: string;

  @Column()
  cvv: string;

  @Column()
  expirationDate: string;

  @Column()
  pin: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
