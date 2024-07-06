import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersReposiotory } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity-typeorm/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersReposiotory],
})
export class UsersModule {}
