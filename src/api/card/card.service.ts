import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { getEnv } from 'src/common/utils/env';
import { CardEntity } from 'src/database/models/card.entity';
import { DataSource } from 'typeorm';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardService extends BaseService<CardEntity> {
  constructor(@InjectDataSource(getEnv('DB_NAME')) private readonly ds: DataSource) {
    super(ds.getRepository(CardEntity));
  }

  async delete(id: string, userSecret: string) {
    return this.repository.delete({ idCard: Number(id), userSecret });
  }

  async updateCard(id: string, userSecret: string, updateCardDto: UpdateCardDto) {
  return this.repository.update(
    { idCard: Number(id), userSecret }, 
    updateCardDto
  );
}
}
