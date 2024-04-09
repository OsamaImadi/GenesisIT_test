import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  
  @Post('')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createAccount(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountsService.createAccount(createAccountDto);
  }

  @Get('user/:id')
  @UseGuards(AuthGuard)
  async getAccountsByUserId(@Param('id') userId: number): Promise<Account[]> {
    return this.accountsService.getAccountsByUserId(userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getAccountById(@Param('id') id: number): Promise<Account> {
    return this.accountsService.getAccountById(id);
  }

  @Patch('increment/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  increment(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.IncrementAmount(+id, updateAccountDto);
  }

  @Patch('decrement/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  decrement(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.DecrementAmount(+id, updateAccountDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }
}
