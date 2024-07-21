import { Injectable } from '@nestjs/common';
import { UsersReposiotory } from '../users.repository';

@Injectable()
export class DistinctPrisma {
  constructor(private readonly usersRepository: UsersReposiotory) {}

  async findPrisma() {
    return await this.usersRepository.findDistinctUsersForPrisma();
  }
}
