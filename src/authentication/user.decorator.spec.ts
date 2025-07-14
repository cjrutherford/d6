import { ExecutionContext } from '@nestjs/common';
import User, { UserType } from './user.decorator';

// Mock createParamDecorator to directly return the decorator function
jest.mock('@nestjs/common', () => ({
  createParamDecorator: jest.fn((fn) => fn),
}));

describe('User Decorator', () => {
  const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjEyMzQ1Njc4OTAsImV4cCI6OTg3NjU0MzIxMH0.signature';
  const mockPayload = {
    userId: '123',
    email: 'test@example.com',
    iat: 1234567890,
    exp: 9876543210,
  };

  let decoratorFunction: Function;

  beforeEach(() => {
    // Re-import User to get the latest decorator function after mocks
    jest.resetModules();
    decoratorFunction = require('./user.decorator').default;
  });

  describe('parseToken', () => {
    it('should correctly parse a valid JWT token', () => {
      const parseToken = (token: string) => {
        const payload = atob(token.split('.')[1]);
        return JSON.parse(payload);
      };
      expect(parseToken(mockToken)).toEqual(mockPayload);
    });

    it('should throw an error for a malformed token', () => {
      const parseToken = (token: string) => {
        const payload = atob(token.split('.')[1]);
        return JSON.parse(payload);
      };
      expect(() => parseToken('invalid.token')).toThrow();
    });
  });

  describe('User decorator', () => {
    it('should return the user payload when a valid token is provided', async () => {
      const mockRequest: any = {
        headers: { authorization: `Bearer ${mockToken}` },
      };
      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => mockRequest,
        }),
      } as ExecutionContext;

      const user = await decoratorFunction(undefined, mockContext);
      expect(user).toEqual(mockPayload);
      expect(mockRequest.user).toEqual(mockPayload);
    });

    it('should throw an error if no token is provided', async () => {
      const mockRequest: any = {
        headers: {},
      };
      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => mockRequest,
        }),
      } as ExecutionContext;

      await expect(decoratorFunction(undefined, mockContext)).rejects.toThrow('No token provided');
    });

    it('should throw an error if an invalid token is provided', async () => {
      const mockRequest: any = {
        headers: { authorization: 'Bearer invalid.token' },
      };
      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => mockRequest,
        }),
      } as ExecutionContext;

      await expect(decoratorFunction(undefined, mockContext)).rejects.toThrow();
    });
  });
});
