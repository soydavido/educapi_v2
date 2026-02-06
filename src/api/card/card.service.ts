import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { getEnv } from 'src/common/utils/env';
import { CardEntity } from 'src/database/models/card.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class CardService extends BaseService<CardEntity> {
  constructor(@InjectDataSource(getEnv('DB_NAME')) private readonly ds: DataSource) {
    super(ds.getRepository(CardEntity));
  }
}
