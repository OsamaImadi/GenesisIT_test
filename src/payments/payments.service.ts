import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';
import { User } from 'src/users/entities/user.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}
  async create(createPaymentDto: CreatePaymentDto) {
    try{
      let updatedSender = await this.userRepo.findOne({where:{id:createPaymentDto.senderId}})
      if(!updatedSender) throw new NotFoundException("Sender not found")
      let updatedReceiver = await this.userRepo.findOne({where:{id:createPaymentDto.receiverId}})
      if(!updatedSender) throw new NotFoundException("Receiver not found")
      let updatedSenderAccount = await this.accountRepo.findOne({where:{user:updatedSender}})
      if(!updatedSenderAccount) throw new NotFoundException("Sender account not found")
      if(updatedSenderAccount.balance<createPaymentDto.amount) {
        throw new BadRequestException('Not enough money in account for this transaction')
      }
      let balance = updatedSenderAccount.balance - createPaymentDto.amount;
      
      let updatedReceiverAccount = await this.accountRepo.findOne({where:{user:updatedReceiver}})
      if(!updatedReceiverAccount) throw new NotFoundException("Receiver account not found")
      let balanceReceiver = updatedReceiverAccount.balance + createPaymentDto.amount;
      await this.accountRepo.update(updatedSenderAccount, {balance})
      await this.accountRepo.update(updatedSenderAccount, {balance:balanceReceiver})
      let payment = await this.paymentRepo.create(createPaymentDto)
      return payment

    }catch(err){
      console.error(err)
      throw err
    }
  }

  async findAll() {
    return await this.paymentRepo.find();
  }

  async findOne(id: number) {
    return await this.paymentRepo.findOne({where:{id}});
  }
}
