import { Body, Controller, Delete, ForbiddenException, Get, Headers, Logger, NotFoundException, Param, Post, Patch, Query } from '@nestjs/common';
import { CreateCardDto } from './dto/card.dto';
import { CardService } from './card.service';
import { UpdateCardDto } from './dto/update-card.dto';

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

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateCardDto: UpdateCardDto, 
    @Headers() headers: any
  ) {
    const userSecret = headers['usersecretpasskey'];
    
    // Validamos la restricción que pusiste en el create (si aplica)
    if(userSecret === 'USR-SECRET-99'){
      throw new ForbiddenException('No es posible modificar cartas con este userSecretPassKey');
    }

    const result = await this.cardService.updateCard(id, userSecret, updateCardDto);

    if (result.affected && result.affected > 0) {
      return { message: "Carta actualizada satisfactoriamente" };
    } else {
      throw new NotFoundException("Carta no encontrada o no tienes permisos");
    }
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
