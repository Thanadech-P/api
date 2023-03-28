import { PartialType } from '@nestjs/mapped-types';
import { CreateStocksparelogDto } from './create-stocksparelog.dto';

export class UpdateStocksparelogDto extends PartialType(CreateStocksparelogDto) {}
