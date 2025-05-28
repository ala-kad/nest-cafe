import { IsString, IsOptional} from 'class-validator';
export class CreateProductDto {
  @IsString()
  name: string;

  price: number;

  quantity: number;

  @IsOptional()
  @IsString()
  imgFile?: string;
}
