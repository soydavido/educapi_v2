import { Controller, Get, Logger, Query } from '@nestjs/common';
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
}
