import { Injectable } from '@nestjs/common';
import { UsersReposiotory } from '../users.repository';

@Injectable()
export class SortTypeORM {
  constructor(private readonly usersRepository: UsersReposiotory) {}

  async findTypeORM() {
    return await this.usersRepository.findSortedUsersForTypeORM();
  }
}
