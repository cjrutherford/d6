import { Test, TestingModule } from '@nestjs/testing';
import { AiAssistanceController } from './ai-assistance.controller';
import { AiAssistanceService } from './ai-assistance.service';
import { PromptContextType, PromptEngineeringService } from './prompt-engineering/prompt-engineering.service';

describe('AiAssistanceController', () => {
  let controller: AiAssistanceController;
  let aiAssistanceService: AiAssistanceService;
  let promptEngineeringService: PromptEngineeringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiAssistanceController],
      providers: [
        {
          provide: AiAssistanceService,
          useValue: {
            getAiResponse: jest.fn(),
          },
        },
        {
          provide: PromptEngineeringService,
          useValue: {
            getPromptContext: jest.fn(),
            generatePrompt: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AiAssistanceController>(AiAssistanceController);
    aiAssistanceService = module.get<AiAssistanceService>(AiAssistanceService);
    promptEngineeringService = module.get<PromptEngineeringService>(PromptEngineeringService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call aiAssistanceService.getAiResponse with correct params and evaluate response', async () => {
    const analyzeDto = { input: 'test input', context: 'affirmation' as PromptContextType };
    const fullContext = 'mocked full context';
    const promptPackage = 'mocked prompt package';
    const rawResponse = 'This is a response. response: up';
    const expectedResult = { response: 'This is a response.', isGoodResponse: true };

    jest.spyOn(promptEngineeringService, 'getPromptContext').mockReturnValue(fullContext);
    jest.spyOn(promptEngineeringService, 'generatePrompt').mockReturnValue(promptPackage);
    jest.spyOn(aiAssistanceService, 'getAiResponse').mockResolvedValue(rawResponse);

    const result = await controller.analyzePrompt(analyzeDto);

    expect(promptEngineeringService.getPromptContext).toHaveBeenCalledWith(analyzeDto.context);
    expect(promptEngineeringService.generatePrompt).toHaveBeenCalledWith(analyzeDto.input, fullContext);
    expect(aiAssistanceService.getAiResponse).toHaveBeenCalledWith(promptPackage);
    expect(result).toEqual(expectedResult);
  });

  it('should return isGoodResponse as false if response is down', async () => {
    const analyzeDto = { input: 'test input', context: 'affirmation' as PromptContextType };
    const fullContext = 'mocked full context';
    const promptPackage = 'mocked prompt package';
    const rawResponse = 'This is a response. response: down';
    const expectedResult = { response: 'This is a response.', isGoodResponse: false };

    jest.spyOn(promptEngineeringService, 'getPromptContext').mockReturnValue(fullContext);
    jest.spyOn(promptEngineeringService, 'generatePrompt').mockReturnValue(promptPackage);
    jest.spyOn(aiAssistanceService, 'getAiResponse').mockResolvedValue(rawResponse);

    const result = await controller.analyzePrompt(analyzeDto);

    expect(result).toEqual(expectedResult);
  });

  it('should return isGoodResponse as false if response does not contain up/down', async () => {
    const analyzeDto = { input: 'test input', context: 'affirmation' as PromptContextType };
    const fullContext = 'mocked full context';
    const promptPackage = 'mocked prompt package';
    const rawResponse = 'This is a response.';
    const expectedResult = { response: 'This is a response.', isGoodResponse: false };

    jest.spyOn(promptEngineeringService, 'getPromptContext').mockReturnValue(fullContext);
    jest.spyOn(promptEngineeringService, 'generatePrompt').mockReturnValue(promptPackage);
    jest.spyOn(aiAssistanceService, 'getAiResponse').mockResolvedValue(rawResponse);

    const result = await controller.analyzePrompt(analyzeDto);

    expect(result).toEqual(expectedResult);
  });
});
