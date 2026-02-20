import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Min
} from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty({message: 'El nombre de la carta no puede estar vacio'})
  @IsString({message: 'El nombre de la carta debe ser una cadena de texto'})
  name!: string;

  @IsOptional()
  @IsString({message: 'La descripción debe ser una cadena de texto'})
  description?: string;

  @Type(() => Number)
  @IsInt({message: 'El ataque debe ser un número entero'})
  @Min(0)
  attack!: number;

  @Type(() => Number)
  @IsInt({message: 'La defensa debe ser un número entero'})
  @Min(0)
  defense!: number;

  @Type(() => Number)
  @IsInt({message: 'Los puntos de vida deben ser un número entero'})
  @Min(0)
  lifePoints!: number;

  @IsOptional()
  @IsUrl()
  pictureUrl?: string;

  @IsOptional()
  attributes?: any;
}
