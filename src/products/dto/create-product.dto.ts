import { IsString, IsInt, Min } from 'class-validator';
export class CreateProductDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)  
  quantity: number;
}
