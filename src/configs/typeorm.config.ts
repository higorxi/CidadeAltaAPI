import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database:  process.env.DB_NAME,
  ssl: true,
  logging: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};