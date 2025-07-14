import { NestExpressApplication } from '@nestjs/platform-express';
import { setupStatic } from './serve-static';
import * as express from 'express';
import { join, extname } from 'path';

// Mock NestExpressApplication
const mockApp = {
  useStaticAssets: jest.fn(),
  setBaseViewsDir: jest.fn(),
  use: jest.fn(),
} as unknown as NestExpressApplication;

// Mock path functions
jest.mock('path', () => ({
  join: jest.fn((...args) => args.join('/')),
  extname: jest.fn((path) => {
    const lastDotIndex = path.lastIndexOf('.');
    return lastDotIndex !== -1 ? path.substring(lastDotIndex) : '';
  }),
}));

describe('setupStatic', () => {
  let originalNodeEnv: string | undefined;

  beforeAll(() => {
    originalNodeEnv = process.env.NODE_ENV;
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = originalNodeEnv; // Restore original NODE_ENV
  });

  it('should configure static assets for production environment', () => {
    process.env.NODE_ENV = 'production';
    setupStatic(mockApp);

    expect(join).toHaveBeenCalledWith(expect.any(String), '..', '..', 'client', 'dist', 'browser');
    expect(mockApp.useStaticAssets).toHaveBeenCalledWith(expect.any(String));
    expect(mockApp.setBaseViewsDir).toHaveBeenCalledWith(expect.any(String));
  });

  it('should configure static assets for development environment', () => {
    process.env.NODE_ENV = 'development';
    setupStatic(mockApp);

    expect(join).toHaveBeenCalledWith(expect.any(String), '..', '..', 'client', 'dist', 'client', 'browser');
    expect(mockApp.useStaticAssets).toHaveBeenCalledWith(expect.any(String));
    expect(mockApp.setBaseViewsDir).toHaveBeenCalledWith(expect.any(String));
  });

  it('should call next() for /api routes', () => {
    setupStatic(mockApp);
    const middleware = (mockApp.use as jest.Mock).mock.calls[0][0];

    const req = { url: '/api/data', method: 'GET' } as unknown as express.Request;
    const res = {} as express.Response;
    const next = jest.fn();

    middleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should send index.html for HTML requests without file extensions', () => {
    setupStatic(mockApp);
    const middleware = (mockApp.use as jest.Mock).mock.calls[0][0];

    const req = { url: '/some/path', method: 'GET', accepts: jest.fn(() => true) } as unknown as express.Request;
    const res = { sendFile: jest.fn() } as unknown as express.Response;
    const next = jest.fn();

    middleware(req, res, next);
    expect(res.sendFile).toHaveBeenCalledWith(expect.stringContaining('index.html'));
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next() for other requests', () => {
    setupStatic(mockApp);
    const middleware = (mockApp.use as jest.Mock).mock.calls[0][0];

    const req = { url: '/image.png', method: 'GET', accepts: jest.fn(() => false) } as unknown as express.Request;
    const res = { sendFile: jest.fn() } as unknown as express.Response; // Mock sendFile
    const next = jest.fn();

    middleware(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.sendFile).not.toHaveBeenCalled();
  });
});
