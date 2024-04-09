import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  
  // async create(createBookingDto: CreateBookingDto): Promise<Booking> {
  //   const { userId, merchantId } = createBookingDto;
  //   const user = await this.userRepo.findOne({where:{id: userId}})
  //   const merchant = await this.userRepo.findOne({where:{id: merchantId}})
  //   const booking = await this.bookingRepository.create({ user, merchant, completed: false });
  //   return await this.bookingRepository.save(booking);
  // }

  // async findAll(): Promise<Booking[]> {
  //   return this.bookingRepository.find();
  // }

  // async findOne(id: number): Promise<Booking> {
  //   const booking = await this.bookingRepository.findOne({where:{id}});
  //   if (!booking) {
  //     throw new NotFoundException('Booking not found');
  //   }
  //   return booking;
  // }

  // async update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
  //   const booking = await this.findOne(id);
  //   booking.completed = updateBookingDto.completed;
  //   return this.bookingRepository.save(booking);
  // }

  // async remove(id: number): Promise<void> {
  //   const booking = await this.findOne(id);
  //   await this.bookingRepository.remove(booking);
  // }
}
