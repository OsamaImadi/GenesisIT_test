import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => User, user => user.bookings)
  user: User;

  @OneToOne(() => User)
  merchant: User;

  @Column()
  completed: boolean;
}
