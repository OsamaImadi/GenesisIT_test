import { Account } from 'src/accounts/entities/account.entity';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';

@Entity({name:'User'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ length: 100, select:false })
    password: string;

    @OneToMany(() => Account, account => account.user)
    accounts: Account[];

    @OneToMany(() => Booking, booking => booking.user)
    bookings: Booking[];
}