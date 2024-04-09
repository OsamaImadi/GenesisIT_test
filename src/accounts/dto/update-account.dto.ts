import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateAccountDto {
    @IsNotEmpty()
    @IsNumber()
    amount: number;
}
