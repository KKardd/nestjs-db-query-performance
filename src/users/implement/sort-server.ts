import { Injectable } from '@nestjs/common';
import { UsersReposiotory } from '../users.repository';

@Injectable()
export class SortServer {
  constructor(private readonly usersRepository: UsersReposiotory) {}

  async findPrisma() {
    const data = await this.usersRepository.findUsersForPrisma();
    return this.sortDataByName(data);
  }

  async findTypeORM() {
    const data = await this.usersRepository.findUsersForTypeORM();
    return this.sortDataByName(data);
  }

  private sortDataByName(data) {
    return data.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }
}
