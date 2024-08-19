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
import { DistinctPrisma } from './implement/distinct-prisma';
import { DistinctServer } from './implement/distinct-server';
import { DistinctTypeORM } from './implement/distinct-typeorm';
import { SortPrisma } from './implement/sort-prisma';
import { SortServer } from './implement/sort-server';
import { SortTypeORM } from './implement/sort-typeorm';
import { PrismaService } from 'src/prisma.service';
import { NormalQuery } from './implement/normal';

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
  providers: [
    UsersService,
    UsersReposiotory,
    DistinctPrisma,
    DistinctServer,
    DistinctTypeORM,
    SortPrisma,
    SortServer,
    SortTypeORM,
    NormalQuery,
    PrismaService,
  ],
})
export class UsersModule {}
