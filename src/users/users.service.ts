import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import  * as _ from 'lodash'

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    public userRepo: Repository<User>,
) {}

async create(createUserDto: CreateUserDto): Promise<User> {
  try{
    let {
      name,
      email,
      password
    } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ name, email, password: hashedPassword });
    let newUser = await this.userRepo.save(user);

    return _.omit(newUser,['password'])
  }catch(err){
    if(err.code == '23505')
      {
        throw new ConflictException(err.detail)
      }
    throw err
  }

}

async findByEmail(email: string): Promise<User | undefined> {
  return this.userRepo.findOne({ where: { email }, select:['id', 'name', 'email', 'password' ] });
}

  async findAll() {
    return await this.userRepo.find()
  }

  async findOne(id: number) {
    return await this.userRepo.findOne({where:{id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepo.update(id, updateUserDto)
    return await this.findOne(id)
  }

  async remove(id: number) {
    let user = await this.userRepo.delete(id)
    if(user.affected){
      return 'User deleted successfully'
    }
    throw new NotFoundException("Resource not found")
  }
}
