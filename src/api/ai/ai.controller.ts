import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { GenerateCardDto } from './dto/generate-card.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate-card')
  async generateCard(@Body() dto: GenerateCardDto, @Headers() headers: any) {
    return this.aiService.generateCard(dto, headers['usersecretpasskey'] ?? '');
  }
}
