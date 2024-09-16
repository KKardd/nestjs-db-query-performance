import { BadRequestException, Injectable } from '@nestjs/common';
import { FilterUserOption } from './enum/filter-user.enum';
import { DistinctServer } from './implement/distinct-server';
import { DistinctPrisma } from './implement/distinct-prisma';
import { DistinctTypeORM } from './implement/distinct-typeorm';
import { SortServer } from './implement/sort-server';
import { SortPrisma } from './implement/sort-prisma';
import { SortTypeORM } from './implement/sort-typeorm';
import { NormalQuery } from './implement/normal';

@Injectable()
export class UsersService {
  constructor(
    private readonly distinctServer: DistinctServer,
    private readonly distinctPrisma: DistinctPrisma,
    private readonly distinctTypeORM: DistinctTypeORM,
    private readonly sortServer: SortServer,
    private readonly sortPrisma: SortPrisma,
    private readonly sortTypeORM: SortTypeORM,
    private readonly normal: NormalQuery,
  ) {}

  async findAllUsersByFiltering(type: FilterUserOption) {
    let data;
    switch (type) {
      case FilterUserOption.FIND_TYPEROM:
        data = await this.normal.findTypeORM();
        break;
      case FilterUserOption.FIND_PRISMA:
        data = await this.normal.findPrisma();
        break;
      default:
        throw new BadRequestException();
    }
    return data;
  }
}
