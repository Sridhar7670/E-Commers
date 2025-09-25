import { IsString, IsOptional, IsNumber, IsBoolean, MinLength, IsUrl, Min, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  Productname: string;

  @IsString()
  Productdescription: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  brand: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsOptional()
  @IsBoolean()
  inStock?: boolean;
}

