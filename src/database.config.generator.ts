import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const configGenerator = (): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    logging: true,
  };
};
