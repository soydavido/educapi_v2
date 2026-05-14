import { Injectable, Logger, BadRequestException, ServiceUnavailableException } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import { CardService } from '../card/card.service';
import { GenerateCardDto } from './dto/generate-card.dto';
import { getEnv } from '../../common/utils/env';

interface AiCardResponse {
  name: string;
  description: string;
  attack: number;
  defense: number;
  lifePoints: number;
  attributes?: Record<string, any>;
  imagePrompt: string;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(private readonly cardService: CardService) {}

  async generateCard(dto: GenerateCardDto, userSecret: string) {
    const prompt = this.buildPrompt(dto.globalContext, dto.cardPrompt);

    let cardData: AiCardResponse;

    try {
      cardData = await this.callGemini(prompt);
      this.logger.log('Card generated via Gemini');
    } catch (geminiError) {
      this.logger.warn(`Gemini failed, trying Groq: ${geminiError}`);
      try {
        cardData = await this.callGroq(prompt);
        this.logger.log('Card generated via Groq (fallback)');
      } catch (groqError) {
        this.logger.error(`Both AI providers failed. Groq: ${groqError}`);
        throw new ServiceUnavailableException('No se pudo generar la carta. Intenta nuevamente.');
      }
    }

    const pictureUrl = this.buildPollinationsUrl(cardData.imagePrompt);

    return this.cardService.create({
      name: cardData.name,
      description: cardData.description,
      attack: cardData.attack,
      defense: cardData.defense,
      lifePoints: cardData.lifePoints,
      attributes: cardData.attributes ?? null,
      pictureUrl,
      userSecret,
    });
  }

  private buildPrompt(globalContext: string, cardPrompt: string): string {
    return `Eres un generador de cartas para un juego educativo.

CONTEXTO DEL PROYECTO:
${globalContext}

DESCRIPCIÓN DE LA CARTA A GENERAR:
${cardPrompt}

Genera una carta siguiendo estrictamente el contexto del proyecto y la descripción dada.
Responde ÚNICAMENTE con un objeto JSON válido con exactamente estos campos:
{
  "name": "nombre de la carta (máximo 100 caracteres)",
  "description": "descripción del concepto educativo (máximo 500 caracteres)",
  "attack": número entero respetando los rangos del contexto,
  "defense": número entero respetando los rangos del contexto,
  "lifePoints": número entero respetando los rangos del contexto,
  "attributes": { "element": "elemento asignado según el contexto" },
  "imagePrompt": "descripción visual detallada en inglés para generar la imagen, incluye colores principales, estilo artístico y elementos visuales del concepto"
}`;
  }

  private async callGemini(prompt: string): Promise<AiCardResponse> {
    const apiKey = getEnv('GEMINI_API_KEY');
    if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: { responseMimeType: 'application/json' },
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return this.parseJson(text);
  }

  private async callGroq(prompt: string): Promise<AiCardResponse> {
    const apiKey = getEnv('GROQ_API_KEY');
    if (!apiKey) throw new Error('GROQ_API_KEY not configured');

    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      response_format: { type: 'json_object' },
    });

    const text = completion.choices[0]?.message?.content ?? '';
    return this.parseJson(text);
  }

  private parseJson(text: string): AiCardResponse {
    try {
      const data = JSON.parse(text);
      const required = ['name', 'description', 'attack', 'defense', 'lifePoints', 'imagePrompt'];
      for (const field of required) {
        if (data[field] === undefined) throw new Error(`Missing field: ${field}`);
      }
      return data as AiCardResponse;
    } catch {
      throw new BadRequestException('La IA devolvió una respuesta inválida');
    }
  }

  private buildPollinationsUrl(imagePrompt: string): string {
    const encoded = encodeURIComponent(imagePrompt);
    return `https://image.pollinations.ai/prompt/${encoded}?width=512&height=512&nologo=true`;
  }
}
