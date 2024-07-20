import { Injectable } from '@nestjs/common';
import { UsersReposiotory } from '../users.repository';

@Injectable()
export class SortTypeORM {
  constructor(private readonly usersRepository: UsersReposiotory) {}
}
