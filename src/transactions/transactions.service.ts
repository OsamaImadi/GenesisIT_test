import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { Account } from 'src/accounts/entities/account.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    @InjectRepository(Account)
    private readonly accountnRepo: Repository<Account>,
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const { accountId, type, amount } = createTransactionDto;
    let account = await this.accountnRepo.findOne({where:{id: accountId}})
    const transaction = this.transactionRepo.create({ account, type, amount });
    return await this.transactionRepo.save(transaction);
  }

  async getTransactionsByAccountId(accountId: number): Promise<Transaction[]> {
    let account = await this.accountnRepo.findOne({where:{id: accountId}})
    return this.transactionRepo.find({ where: { account } });
  }
}
