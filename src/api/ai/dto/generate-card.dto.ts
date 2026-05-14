import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateCardDto {
  @IsNotEmpty({ message: 'El contexto global no puede estar vacío' })
  @IsString()
  globalContext!: string;

  @IsNotEmpty({ message: 'El prompt de la carta no puede estar vacío' })
  @IsString()
  cardPrompt!: string;
}
