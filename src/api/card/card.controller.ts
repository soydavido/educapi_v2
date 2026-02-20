import { Body, Controller, ForbiddenException, Get, Headers, Logger, Post, Query } from '@nestjs/common';
import { CreateCardDto } from './dto/card.dto';
import { CardService } from './card.service';

@Controller('card')
export class CardController {
  protected readonly logger = new Logger(CardController.name);

  constructor(private readonly cardService: CardService) {}

  @Get()
  async find(@Query() query: any) {
    const { page = 1, limit = 20, ...filters } = query;
    return this.cardService.find(Number(page), Number(limit), filters);
  }

  @Post()
  async create(@Body() createCardDto: CreateCardDto, @Headers() headers: any) {
    this.logger.log('Headers:', headers);
    if(headers.usersecretpasskey == 'USR-SECRET-99'){
      throw new ForbiddenException('No es posible crear cartas con el userSecretPassKey proporcionado');
    }
    const cardData = { ...createCardDto, userSecret: headers['usersecretpasskey'] };
    return this.cardService.create(cardData);
  }
}
