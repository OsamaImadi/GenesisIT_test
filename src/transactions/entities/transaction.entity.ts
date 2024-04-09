import { Account } from 'src/accounts/entities/account.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Account, account => account.transactions)
    account: Account;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount: number;

    @Column({ length: 100 })
    type: string; // "Deposit", "Withdrawal", "Transfer", etc.

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    timestamp: Date;
}