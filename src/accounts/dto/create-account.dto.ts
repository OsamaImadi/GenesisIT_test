import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  initialBalance: number;
}