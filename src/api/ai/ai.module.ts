import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { CardModule } from '../card/card.module';

@Module({
  imports: [CardModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
