import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

export interface LlamaOptions {
    host: string;
    port: number;
}

export class AiPromptOptions{
    model: string = 'gemma3n';
    temperature: number = 0.7;
    stream: boolean = false;
}

@Injectable()
export class AiAssistanceService {
    constructor(@Inject('LlamaOptions') private readonly llamaOptions: LlamaOptions, private readonly http: HttpService) {}

    async getAiResponse(prompt: string, options: AiPromptOptions = {model: 'gemma3n', temperature: 0.7, stream: false}): Promise<any> {
        try {
            const response = await firstValueFrom(this.http.post(
                `http://${this.llamaOptions.host}:${this.llamaOptions.port}/api/generate`, 
                {
                    prompt,
                    model: options.model,
                    temperature: options.temperature,
                    stream: options.stream,
                }
            ));
            console.log("🚀 ~ AiAssistanceService ~ getAiResponse ~ response:", response.data)

            return response.data.response;
        } catch (error) {
            console.error('Error fetching AI response:', error);
            throw new Error('Failed to fetch AI response');
        }
    }
}
