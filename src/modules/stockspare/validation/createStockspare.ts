import { IsNotEmpty,IsEnum, IsEmpty } from 'class-validator';

export class createStockspareDtoValidate {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  amount: string;
  @IsNotEmpty()
  price_in: string;
  @IsNotEmpty()
  price_out: string;
  @IsNotEmpty()
  stock: string;
  @IsNotEmpty()
  profit: string;
}