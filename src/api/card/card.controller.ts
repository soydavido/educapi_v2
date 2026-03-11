import { Body, Controller, Delete, ForbiddenException, Get, Headers, Logger, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { CreateCardDto } from './dto/card.dto';
import { CardService } from './card.service';

@Controller('card')
export class CardController {
  protected readonly logger = new Logger(CardController.name);

  constructor(private readonly cardService: CardService) {}

  @Get()
  async find(@Query() query: any, @Headers() headers: any) {
    const { page = 1, limit = 20, ...filters } = query;
    filters.userSecret = headers['usersecretpasskey'];
    return this.cardService.find(Number(page), Number(limit), filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Headers() headers: any) {
    return this.cardService.find(1, 1, { idCard: id, userSecret: headers['usersecretpasskey'] });
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

  @Delete(':id')
  async delete(@Param('id') id: string, @Headers() headers: any) {
    const result = await this.cardService.delete(id, headers['usersecretpasskey']);
    if (result.affected && result.affected > 0) {
      return { message: "Carta eliminada satisfactoriamente" };
    } else {
      throw new NotFoundException("Carta no encontrada");
    }
  }
}
