import { Account } from 'src/accounts/entities/account.entity';
import { Booking } from 'src/bookings/entities/booking.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  qrCode: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => User)
  sender: User;

  @ManyToOne(() => Account)
  senderAccount: Account;

  @ManyToOne(() => User)
  receiver: User;

  @ManyToOne(() => Account)
  receiverAccount: Account;
}
