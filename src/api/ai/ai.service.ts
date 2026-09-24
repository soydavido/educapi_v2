import { Injectable, Logger, BadRequestException, ServiceUnavailableException } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
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
      cardData = await this.callOpenRouter(prompt);
      this.logger.log('Card generated via OpenRouter');
    } catch (openRouterError) {
      this.logger.warn(`OpenRouter failed, trying Gemini: ${this.describeError(openRouterError)}`);
      try {
        cardData = await this.callGemini(prompt);
        this.logger.log('Card generated via Gemini (fallback)');
      } catch (geminiError) {
        this.logger.error(
          `Both AI providers failed. OpenRouter: ${this.describeError(openRouterError)} | Gemini: ${this.describeError(geminiError)}`,
        );
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
Responde ÚNICAMENTE con un objeto JSON válido con exactamente estos campos y en lenguaje Español:
{
  "name": "nombre de la carta (máximo 100 caracteres)",
  "description": "descripción del concepto educativo (máximo 500 caracteres)",
  "attack": número entero respetando los rangos del contexto,
  "defense": número entero respetando los rangos del contexto,
  "lifePoints": número entero respetando los rangos del contexto,
  "attributes": { "element": "elemento asignado según el contexto" },
  "imagePrompt": "descripción visual detallada en inglés en una sola cadena de texto, incluye colores principales, estilo artístico y elementos visuales del concepto"
}`;
  }

  private async callGemini(prompt: string): Promise<AiCardResponse> {
    const apiKey = getEnv('GEMINI_API_KEY');
    if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

    const modelName = getEnv('GEMINI_MODEL', 'gemini-flash-latest');

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: { responseMimeType: 'application/json' },
    });

    const result = await this.withRetry(
      () => model.generateContent(prompt),
      `Gemini request failed (model: ${modelName})`,
    );

    const text = result.response.text();
    return this.parseJson(text);
  }

  private async callOpenRouter(prompt: string): Promise<AiCardResponse> {
    const apiKey = getEnv('OPENROUTER_API_KEY');
    if (!apiKey) throw new Error('OPENROUTER_API_KEY not configured');

    const modelName = getEnv('OPENROUTER_MODEL', 'nvidia/nemotron-3-super-120b-a12b:free');

    const completion = await this.withRetry(async () => {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: modelName,
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' },
        }),
      });

      const data: any = await res.json();

      if (!res.ok || data.error) {
        const status = data.error?.code ?? res.status;
        const err: any = new Error(`${status} ${JSON.stringify(data.error ?? data)}`);
        err.status = status;
        throw err;
      }

      return data;
    }, `OpenRouter request failed (model: ${modelName})`);

    const text = (completion as any).choices?.[0]?.message?.content ?? '';
    return this.parseJson(text);
  }

  /** Retries transient failures (rate limit / server overload) with exponential backoff. */
  private async withRetry<T>(
    fn: () => Promise<T>,
    errorPrefix: string,
    maxAttempts = 3,
  ): Promise<T> {
    let lastErr: unknown;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (err) {
        lastErr = err;
        if (!this.isRetryable(err) || attempt === maxAttempts) break;
        const delayMs = 1000;
        this.logger.warn(`${errorPrefix}: ${this.describeError(err)} (retrying in ${delayMs}ms, attempt ${attempt}/${maxAttempts})`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
    throw new Error(`${errorPrefix}: ${this.describeError(lastErr)}`);
  }

  /** Only retries transient server-side errors. 429 is excluded on purpose: quota/rate-limit
   * resets take much longer than our backoff window, so retrying wastes attempts — better to
   * fail over to the next provider immediately. */
  private isRetryable(err: unknown): boolean {
    const status = (err as Record<string, any>)?.status;
    if (typeof status === 'number') return [500, 502, 503, 504].includes(status);
    const message = this.describeError(err);
    return /\b(500|502|503|504)\b/.test(message);
  }

  private describeError(err: unknown): string {
    if (err instanceof Error) return err.message;
    if (typeof err === 'object' && err !== null) {
      const anyErr = err as Record<string, any>;
      return anyErr.message ?? anyErr.error?.message ?? JSON.stringify(anyErr);
    }
    return String(err);
  }

  private parseJson(text: string): AiCardResponse {
    try {
      const data = JSON.parse(text);
      const required = ['name', 'description', 'attack', 'defense', 'lifePoints', 'imagePrompt'];
      for (const field of required) {
        if (data[field] === undefined) throw new Error(`Missing field: ${field}`);
      }
      // Normalize imagePrompt to string in case the AI wraps it in an object
      if (typeof data.imagePrompt !== 'string') {
        data.imagePrompt = typeof data.imagePrompt === 'object'
          ? Object.values(data.imagePrompt).join(', ')
          : String(data.imagePrompt);
      }
      return data as AiCardResponse;
    } catch {
      throw new BadRequestException('La IA devolvió una respuesta inválida');
    }
  }

  private buildPollinationsUrl(imagePrompt: any): string {
    const prompt = typeof imagePrompt === 'string'
      ? imagePrompt
      : JSON.stringify(imagePrompt);
    const encoded = encodeURIComponent(prompt);
    return `https://image.pollinations.ai/prompt/${encoded}?width=512&height=512&nologo=true`;
  }
}
