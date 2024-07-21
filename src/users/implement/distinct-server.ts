import { Injectable } from '@nestjs/common';
import { UsersReposiotory } from '../users.repository';

@Injectable()
export class DistinctServer {
  constructor(private readonly usersRepository: UsersReposiotory) {}

  async findTypeORM() {
    return await this.usersRepository.findUsersForTypeORM();
  }

  async findPrisma() {
    return await this.usersRepository.findUsersForPrisma();
  }
}
