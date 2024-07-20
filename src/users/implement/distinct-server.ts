import { Injectable } from '@nestjs/common';
import { UsersReposiotory } from '../users.repository';

@Injectable()
export class DistinctServer {
  constructor(private readonly usersRepository: UsersReposiotory) {}

  async findTypeORM() {
    const data = await this.usersRepository.findUsersForTypeORM();
    console.log(data.length);
  }

  async findPrisma() {
    const data = await this.usersRepository.findUsersForPrisma();
    console.log(data);
  }
}
