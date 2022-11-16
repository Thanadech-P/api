import { IsNotEmpty,IsEnum } from 'class-validator';

export class summaryPurchaseDtoValidate {
  @IsNotEmpty({ message: 'Params "date" is Empty'})
  date: Date
}