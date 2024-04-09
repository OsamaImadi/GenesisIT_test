import { Transaction } from 'src/transactions/entities/transaction.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    accountNumber: string;

    @Column({ default: 0 })
    balance: number;

    @ManyToOne(() => User, user => user.accounts)
    user: User;

    @OneToMany(() => Transaction, transaction => transaction.account)
    transactions: Transaction[];
}
