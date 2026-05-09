import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { BaseService } from '../../common/services/base.service';
import { getEnv } from '../../common/utils/env';
import { CardEntity } from '../../database/models/card.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class CardService extends BaseService<CardEntity> {
  constructor(@InjectDataSource(getEnv('DB_NAME')) private readonly ds: DataSource) {
    super(ds.getRepository(CardEntity));
  }

  async delete(id: string, userSecret: string) {
    return this.repository.delete({ idCard: Number(id), userSecret });
  }
}
