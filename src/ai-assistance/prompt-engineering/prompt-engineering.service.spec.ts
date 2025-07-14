import { Test, TestingModule } from '@nestjs/testing';
import { PromptEngineeringService, PromptContextType } from './prompt-engineering.service';

describe('PromptEngineeringService', () => {
  let service: PromptEngineeringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromptEngineeringService],
    }).compile();

    service = module.get<PromptEngineeringService>(PromptEngineeringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generatePrompt', () => {
    it('should generate a prompt with the given user input and context', () => {
      const userInput = 'This is my user input.';
      const context = 'mental well-being';
      const prompt = service.generatePrompt(userInput, context);

      expect(prompt).toContain(`You are an AI assistant designed to help with ${context}.`);
      expect(prompt).toContain(`User Input: "${userInput}"`);
      expect(prompt).toContain('Please keep your response to a single paragraph.');
      expect(prompt).toContain('Provide an up or down value to determine if the user input is a good response to the prompt.');
      expect(prompt).toContain('only provide the up/down response value once and only at the end of your response.');
    });
  });

  describe('getPromptContext', () => {
    it('should return the correct context description for affirmation', () => {
      const context = service.getPromptContext('affirmation');
      expect(context).toContain('affirmations are statements to boost confidence and positivity. Please ensure the user input is a useful affirmation and respond to the affirmation constructively.');
    });

    it('should return the correct context description for plannedPleasurable', () => {
      const context = service.getPromptContext('plannedPleasurable');
      expect(context).toContain('activities that bring joy and relaxation. Please ensure the user input is a planned pleasurable activity and respond to it constructively. if it\'s not, suggest a new activity.');
    });

    it('should return the correct context description for judgement', () => {
      const context = service.getPromptContext('judgement');
      expect(context).toContain('ways to handle judgement and criticism. Please ensure the user input is related to judgement and respond to it constructively. The purpose here is to vent, and understand that if there is a judgement, we will be trying to turn it around in a non-judgement step.');
    });

    it('should return the correct context description for nonJudgement', () => {
      const context = service.getPromptContext('nonJudgement');
      expect(context).toContain('practices for non-judgmental awareness. Please ensure the user input is related to non-judgment and respond to it constructively.');
    });

    it('should return the correct context description for mindfulActivity', () => {
      const context = service.getPromptContext('mindfulActivity');
      expect(context).toContain('mindful activities to enhance presence. Please ensure the user input is related to mindfulness and respond to it constructively.');
    });

    it('should return the correct context description for gratitude', () => {
      const context = service.getPromptContext('gratitude');
      expect(context).toContain('expressions of gratitude and appreciation. Please ensure the user input is a genuine expression of gratitude and respond to it constructively.');
    });

    it('should return general assistance for unknown context type', () => {
      const context = service.getPromptContext('unknown' as PromptContextType);
      expect(context).toBe('general assistance');
    });
  });
});