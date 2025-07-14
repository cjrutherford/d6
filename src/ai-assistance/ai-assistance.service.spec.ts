import { Test, TestingModule } from '@nestjs/testing';
import { AiAssistanceService, AiPromptOptions } from './ai-assistance.service';
import { HttpService } from '@nestjs/axios';
import { PromptEngineeringService } from './prompt-engineering/prompt-engineering.service';
import { of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

describe('AiAssistanceService', () => {
  let service: AiAssistanceService;
  let httpService: HttpService;
  let promptEngineeringService: PromptEngineeringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiAssistanceService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(() => of({ data: { response: 'mocked response' } }))
          },
        },
        {
          provide: PromptEngineeringService,
          useValue: {
            generatePrompt: jest.fn(() => 'mocked prompt'),
          },
        },
        {
          provide: 'LlamaOptions',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AiAssistanceService>(AiAssistanceService);
    httpService = module.get<HttpService>(HttpService);
    promptEngineeringService = module.get<PromptEngineeringService>(PromptEngineeringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call httpService.post with correct parameters', async () => {
      const prompt = 'test prompt';
      const expectedResponse = 'mocked response';
      const options: AiPromptOptions = { model: 'gemma3n', temperature: 0.7, stream: false };

      const result = await service.getAiResponse(prompt, options);

      expect(httpService.post).toHaveBeenCalledWith(
        `http://${service['llamaOptions'].host}:${service['llamaOptions'].port}/api/generate`,
        {
          prompt,
          model: options.model,
          temperature: options.temperature,
          stream: options.stream,
        }
      );
      expect(result).toEqual(expectedResponse);
    });

    it('should handle error when fetching AI response', async () => {
      const prompt = 'test prompt';
      const options: AiPromptOptions = { model: 'gemma3n', temperature: 0.7, stream: false };
      const errorMessage = 'Failed to fetch AI response';

      jest.spyOn(httpService, 'post').mockReturnValue(of(new Error('some error')).pipe(mergeMap(err => throwError(() => err))));

      await expect(service.getAiResponse(prompt, options)).rejects.toThrow(errorMessage);
    });
});
