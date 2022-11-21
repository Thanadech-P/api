import { IsNotEmpty } from 'class-validator';

export class createVehicleDtoValidate {
  @IsNotEmpty()
  vehicle_number: string;
  @IsNotEmpty()
  vehicle_type: string;
  @IsNotEmpty()
  vehicle_brand: string;
}