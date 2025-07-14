import { Test, TestingModule } from '@nestjs/testing';
import { AiAssistanceModule } from './ai-assistance.module';
import { AiAssistanceController } from './ai-assistance.controller';
import { AiAssistanceService } from './ai-assistance.service';
import { PromptEngineeringService } from './prompt-engineering/prompt-engineering.service';
import { HttpModule } from '@nestjs/axios';

describe('AiAssistanceModule', () => {
  let originalProcessEnv: NodeJS.ProcessEnv;

  beforeAll(() => {
    originalProcessEnv = process.env;
  });

  beforeEach(() => {
    jest.resetModules(); // Reset modules before each test
    process.env = { ...originalProcessEnv }; // Restore original process.env
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AiAssistanceController],
      providers: [
        AiAssistanceService,
        PromptEngineeringService,
        {
          provide: 'LlamaOptions',
          useFactory: () => ({
            host: process.env.LLAMA_HOST ?? 'localhost',
            port: process.env.LLAMA_PORT ? parseInt(process.env.LLAMA_PORT, 10) : 11434,
          }),
        },
      ],
    }).compile();
    expect(module).toBeDefined();
  });

  it('should have AiAssistanceController', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AiAssistanceController],
      providers: [
        AiAssistanceService,
        PromptEngineeringService,
        {
          provide: 'LlamaOptions',
          useFactory: () => ({
            host: process.env.LLAMA_HOST ?? 'localhost',
            port: process.env.LLAMA_PORT ? parseInt(process.env.LLAMA_PORT, 10) : 11434,
          }),
        },
      ],
    }).compile();
    const controller = module.get<AiAssistanceController>(AiAssistanceController);
    expect(controller).toBeDefined();
  });

  it('should have AiAssistanceService', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AiAssistanceController],
      providers: [
        AiAssistanceService,
        PromptEngineeringService,
        {
          provide: 'LlamaOptions',
          useFactory: () => ({
            host: process.env.LLAMA_HOST ?? 'localhost',
            port: process.env.LLAMA_PORT ? parseInt(process.env.LLAMA_PORT, 10) : 11434,
          }),
        },
      ],
    }).compile();
    const service = module.get<AiAssistanceService>(AiAssistanceService);
    expect(service).toBeDefined();
  });

  it('should have PromptEngineeringService', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AiAssistanceController],
      providers: [
        AiAssistanceService,
        PromptEngineeringService,
        {
          provide: 'LlamaOptions',
          useFactory: () => ({
            host: process.env.LLAMA_HOST ?? 'localhost',
            port: process.env.LLAMA_PORT ? parseInt(process.env.LLAMA_PORT, 10) : 11434,
          }),
        },
      ],
    }).compile();
    const service = module.get<PromptEngineeringService>(PromptEngineeringService);
    expect(service).toBeDefined();
  });

  it('should provide LlamaOptions with default values', async () => {
    process.env.LLAMA_HOST = undefined;
    process.env.LLAMA_PORT = undefined;

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AiAssistanceController],
      providers: [
        AiAssistanceService,
        PromptEngineeringService,
        {
          provide: 'LlamaOptions',
          useFactory: () => ({
            host: process.env.LLAMA_HOST ?? 'localhost',
            port: process.env.LLAMA_PORT ? parseInt(process.env.LLAMA_PORT, 10) : 11434,
          }),
        },
      ],
    }).compile();

    const llamaOptions = module.get('LlamaOptions');
    expect(llamaOptions.host).toBe('localhost');
    expect(llamaOptions.port).toBe(11434);
  });

  it('should provide LlamaOptions with environment variables', async () => {
    process.env.LLAMA_HOST = 'test_host';
    process.env.LLAMA_PORT = '8080';

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AiAssistanceController],
      providers: [
        AiAssistanceService,
        PromptEngineeringService,
        {
          provide: 'LlamaOptions',
          useFactory: () => ({
            host: process.env.LLAMA_HOST ?? 'localhost',
            port: process.env.LLAMA_PORT ? parseInt(process.env.LLAMA_PORT, 10) : 11434,
          }),
        },
      ],
    }).compile();

    const llamaOptions = module.get('LlamaOptions');
    expect(llamaOptions.host).toBe('test_host');
    expect(llamaOptions.port).toBe(8080);
  });
});
