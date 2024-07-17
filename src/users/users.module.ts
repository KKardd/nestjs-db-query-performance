import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersReposiotory } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity-typeorm/users.entity';
import { Company } from './entity-typeorm/company.entity';
import { BigJobKind } from './entity-typeorm/big-job-kind.entity';
import { MidJobKind } from './entity-typeorm/mid-job.kind.entity';
import { SmallJobKind } from './entity-typeorm/small-job-kind.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Company,
      BigJobKind,
      MidJobKind,
      SmallJobKind,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersReposiotory],
})
export class UsersModule {}
