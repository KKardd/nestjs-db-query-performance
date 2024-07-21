import { Injectable } from '@nestjs/common';
import { UsersReposiotory } from '../users.repository';

@Injectable()
export class DistinctTypeORM {
  constructor(private readonly usersRepository: UsersReposiotory) {}

  async findTypeORM() {
    return await this.usersRepository.findDistinctUsersForTypeORM();
  }
}
