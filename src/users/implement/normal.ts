import { Injectable } from '@nestjs/common';
import { UsersReposiotory } from '../users.repository';

@Injectable()
export class NormalQuery {
  constructor(private readonly usersRepository: UsersReposiotory) {}

  async findPrisma() {
    return await this.usersRepository.findUsersForPrisma();
  }

  async findTypeORM() {
    return await this.usersRepository.findUsersForTypeORM();
  }
}
