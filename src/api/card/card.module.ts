import { Module } from '@nestjs/common';
import { getEnv } from 'src/common/utils/env';
import { DatabaseModule } from 'src/modules/database.module';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { CardEntity } from 'src/database/models/card.entity';

@Module({
  imports: [
    DatabaseModule.forEntities(getEnv('DB_NAME'), [
      CardEntity
    ]),
  ],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule { }
