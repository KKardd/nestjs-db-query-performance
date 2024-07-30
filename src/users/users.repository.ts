import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity-typeorm/users.entity';
import { EntityManager, Repository } from 'typeorm';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersReposiotory {
  constructor(
    @InjectRepository(Users)
    private readonly users: Repository<Users>,
    private readonly entityManager: EntityManager,
    private readonly prisma: PrismaService,
  ) {}

  // 조건없는 모든 유저 찾기(TypeORM)
  async findUsersForTypeORM() {
    return await this.users.find({
      relations: {
        company: true,
      },
    });
  }

  // 정렬(companyId)되어 있는 모든 유저 찾기(TypeORM)
  async findSortedUsersForTypeORM() {
    return await this.users.find({
      order: {
        companyId: 'ASC',
      },
    });
  }

  // 중복제거(companyId)한 모든 유저 찾기(TypeORM)
  async findDistinctUsersForTypeORM() {
    return await this.entityManager
      .createQueryBuilder(Users, 'u')
      .distinctOn(['u.company_id'])
      .getRawMany();
  }

  // 조건없는 모든 유저 찾기(prisma)
  async findUsersForPrisma() {
    return await this.prisma.users.findMany({
      include: {
        company: true,
      },
    });
  }

  // 정렬(companyId)되어 있는 모든 유저 찾기(prisma)
  async findSortedUsersForPrisma() {
    return await this.prisma.users.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  // 중복제거(companyId)한 모든 유저 찾기(prisma)
  async findDistinctUsersForPrisma() {
    return await this.prisma.users.findMany({
      distinct: ['companyId'],
    });
  }
}
