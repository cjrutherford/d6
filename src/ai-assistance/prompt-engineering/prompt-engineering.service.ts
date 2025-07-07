import { Injectable } from '@nestjs/common';

export declare type PromptContextType = 'affirmation' | 'plannedPleasurable' | 'judgement' | 'nonJudgement' | 'mindfulActivity' | 'gratitude';

@Injectable()
export class PromptEngineeringService {

    generatePrompt(userInput: string, context: string): string {
        // start by defining the structure of the prompt
        const promptStructure = `
            You are an AI assistant designed to help with ${context}.
            You are versed in the skills of Dialectical Behavior Therapy (DBT) and Cognitive Behavioral Therapy (CBT).
            Do not ask further prompts as part of the response. Simply provide a short analysis of the user input.
            The purpose of the exercise is to help the user reflect on their thoughts and feelings in a safe, constructive, and mindful manner.
            User Input: "${userInput}"
            Please keep your response to a single paragraph.
            Provide an up or down value to determine if the user input is a good response to the prompt. (the up down value should be "response: "up" or "down" ")
            The response already requested should be a down value if the user input is not a good response like not following the prompt, or not being constructive.
            only provide the up/down response value once and only at the end of your response.
        `;
        return promptStructure;
    }

    getPromptContext(contextType: PromptContextType): string {
        const initialContext = 'a daily prompt series to help improve their mental well-being and mindfulness. the current context is ' + contextType + '. Remember that: ';
    
        const contextDescriptions: Record<PromptContextType, string> = {
            affirmation: 'affirmations are statements to boost confidence and positivity. Please ensure the user input is a useful affirmation and respond to the affirmation constructively.',
            plannedPleasurable: 'activities that bring joy and relaxation. Please ensure the user input is a planned pleasurable activity and respond to it constructively. if it\'s not, suggest a new activity.',
            judgement: 'ways to handle judgement and criticism. Please ensure the user input is related to judgement and respond to it constructively. The purpose here is to vent, and understand that if there is a judgement, we will be trying to turn it around in a non-judgement step.',
            nonJudgement: 'practices for non-judgmental awareness. Please ensure the user input is related to non-judgment and respond to it constructively.',
            mindfulActivity: 'mindful activities to enhance presence. Please ensure the user input is related to mindfulness and respond to it constructively.',
            gratitude: 'expressions of gratitude and appreciation. Please ensure the user input is a genuine expression of gratitude and respond to it constructively.',
        };
    
        return contextDescriptions[contextType]
            ? initialContext + contextDescriptions[contextType]
            : 'general assistance';
    }
}
