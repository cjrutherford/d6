import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

describe('DataSource', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeAll(() => {
    originalEnv = process.env;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should initialize DataSource with default values if environment variables are not set', () => {
    process.env = {}; // Clear environment variables for this test

    const newDs = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'd6',
    });

    const options = newDs.options as PostgresConnectionOptions;
    expect(options.host).toBe('localhost');
    expect(options.port).toBe(5432);
    expect(options.username).toBe('postgres');
    expect(options.password).toBe('postgres');
    expect(options.database).toBe('d6');
  });

  it('should initialize DataSource with environment variables if set', () => {
    process.env = {
      DB_HOST: 'test_host',
      DB_PORT: '1234',
      DB_USERNAME: 'test_user',
      DB_PASSWORD: 'test_password',
      DB_NAME: 'test_db',
    };

    const newDs = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const options = newDs.options as PostgresConnectionOptions;
    expect(options.host).toBe('test_host');
    expect(options.port).toBe(1234);
    expect(options.username).toBe('test_user');
    expect(options.password).toBe('test_password');
    expect(options.database).toBe('test_db');
  });
});
