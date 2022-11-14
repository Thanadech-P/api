import { IsNotEmpty,IsEnum } from 'class-validator';

export class createPurchaseDtoValidate {
  @IsNotEmpty()
  field_no: string;
  @IsNotEmpty()
  @IsEnum(['IN','OUT'], { message: 'Type is IN or OUT'})
  type: string;
  @IsNotEmpty()
  total: string;
  @IsNotEmpty()
  amount: string;
  @IsNotEmpty()
  time_in: Date;
  @IsNotEmpty()
  time_out: Date;
  @IsNotEmpty()
  partner: string;
  @IsNotEmpty()
  product_id: number;
  @IsNotEmpty()
  product_name: string;
  @IsNotEmpty()
  product_amount: string;
  @IsNotEmpty()
  product_price_per_unit: string;
  @IsNotEmpty()
  product_net_amount: string;
  @IsNotEmpty()
  car_number: string;
  @IsNotEmpty()
  car_weight_in: string;
  @IsNotEmpty()
  car_weight_out: string;
  @IsNotEmpty()
  car_weight: string;
  @IsNotEmpty()
  weight_amount: string;
  @IsNotEmpty()
  subtract_weight: string;
  @IsNotEmpty()
  weigher: string;
  @IsNotEmpty()
  recipient: string;
  @IsNotEmpty()
  deliver_man: string;
  @IsNotEmpty()
  note: string;
  service_date?: Date
}