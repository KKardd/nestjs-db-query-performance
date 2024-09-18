import { Injectable } from '@nestjs/common';
import { UsersReposiotory } from '../users.repository';

@Injectable()
export class DistinctServer {
  constructor(private readonly usersRepository: UsersReposiotory) {}

  async findTypeORM() {
    const data = await this.usersRepository.findUsersForTypeORM();
    const refinedData = this.distinctName(data);
    return refinedData;
  }

  async findPrisma() {
    const data = await this.usersRepository.findUsersForPrisma();
    const refinedData = this.distinctName(data);
    return refinedData;
  }

  private distinctName(data) {
    // 중복된 name을 제거한 배열 생성
    const uniqueNames = new Set();
    const filteredData = data.filter((user) => {
      if (uniqueNames.has(user.name)) {
        return false; // 중복된 name이면 필터링
      } else {
        uniqueNames.add(user.name);
        return true; // 중복이 없으면 유지
      }
    });
    return filteredData;
  }
}
