import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { configGenerator } from './database.config.generator';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: __dirname + `/../src/.env`,
    }),
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => configGenerator(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
