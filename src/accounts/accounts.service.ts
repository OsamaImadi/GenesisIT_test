import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';
import { User } from 'src/users/entities/user.entity';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
    const { userId, initialBalance } = createAccountDto;
    const user = await this.userRepo.findOne({where:{id: userId}})
    const account = this.accountRepo.create({ user, balance: initialBalance, accountNumber: `${Date.now()}` });
    return await this.accountRepo.save(account);
  }

  async getAccountsByUserId(userId: number): Promise<Account[]> {
    const user = await this.userRepo.findOne({where:{id: userId}})
    return this.accountRepo.find({ where: { user } });
  }

  async getAccountById(accountId: number): Promise<Account> {
    return this.accountRepo.findOne({where:{id:accountId}});
  }

  async IncrementAmount(accountId: number, updateAccountDto: UpdateAccountDto): Promise<Account> {
    let account = await this.accountRepo.findOne({where:{id:accountId}});
    let balance = account.balance + updateAccountDto.amount;
    await this.accountRepo.update(accountId, {balance})
    return await this.getAccountById(accountId)
  }

  async DecrementAmount(accountId: number, updateAccountDto: UpdateAccountDto): Promise<Account> {
    let account = await this.accountRepo.findOne({where:{id:accountId}});
    if(updateAccountDto.amount>account.balance) {
      throw new BadRequestException('Not enough money in account for this transaction')
    }
    let balance = account.balance - updateAccountDto.amount;
    await this.accountRepo.update(accountId, {balance})
    return await this.getAccountById(accountId)
  }

  
  async remove(id: number) {
    let account = await this.accountRepo.delete(id)
    if(account.affected){
      return 'Account deleted successfully'
    }
    throw new NotFoundException("Resource not found")
  }
}
