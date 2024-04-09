import { IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';

export class UpdateBookingDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsBoolean()
  completed: boolean;
}
