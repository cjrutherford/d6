import { Body, Controller, Post } from '@nestjs/common';
import { PromptContextType, PromptEngineeringService } from './prompt-engineering/prompt-engineering.service';
import { AiAssistanceService } from './ai-assistance.service';

export class AiPrompt {
    input: string;
    context: PromptContextType
}

@Controller('ai-assistance')
export class AiAssistanceController {
    constructor(private readonly prompts: PromptEngineeringService, private readonly aiAssistanceService: AiAssistanceService) {}

    @Post('analyze')
    async analyzePrompt(@Body() promptData: AiPrompt): Promise<{ response: string, isGoodResponse: boolean }> {
        // Use the PromptEngineeringService to analyze the prompt
        const fullContext = this.prompts.getPromptContext(promptData.context);
        const promptPackage = this.prompts.generatePrompt(promptData.input, fullContext);
        const rawResponse = await this.aiAssistanceService.getAiResponse(promptPackage);

        // Analyze the raw response to determine if it's a good response
        const isGoodResponse = this.evaluateResponse(rawResponse);
        const responseIndex = rawResponse.indexOf('response:');
        const finalResponse = responseIndex !== -1 ? rawResponse.slice(0, responseIndex).trim() : rawResponse.trim();
        return { response: finalResponse, isGoodResponse };
    }

    private evaluateResponse(response: string): boolean {
        // Implement your logic to evaluate the response
        const regex = /response:\s*(up|down)/i;
        const match = regex.exec(response);
        if (match) {
            return match[1].toLowerCase() === 'up';
        }
        return false;
    }
}
