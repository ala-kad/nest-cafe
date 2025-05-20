import { IsOptional } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';

export class CreateOrderDto {
  @IsOptional()
  orderItems: Product[];
}
