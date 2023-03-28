import { IsNotEmpty, IsEnum } from 'class-validator';

export class createPurchaseDtoValidate {
  @IsNotEmpty()
  field_no: string;
  @IsNotEmpty()
  @IsEnum(['IN', 'OUT'], { message: 'Type is IN or OUT' })
  type: string;
  @IsNotEmpty()
  time_in: string;
  @IsNotEmpty()
  time_out: string;
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
  recipient?: string;
  deliver_man?: string;
  note?: string;
  service_date?: Date
}