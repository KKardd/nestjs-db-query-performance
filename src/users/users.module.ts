import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersReposiotory } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersReposiotory],
})
export class UsersModule {}
