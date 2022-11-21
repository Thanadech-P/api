import { IsNotEmpty, IsArray } from 'class-validator';

export class createUserDtoValidate {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsArray()
  role: string;
}