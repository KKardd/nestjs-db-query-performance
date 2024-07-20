import { Injectable } from '@nestjs/common';
import { UsersReposiotory } from '../users.repository';

@Injectable()
export class SortPrisma {
  constructor(private readonly usersRepository: UsersReposiotory) {}
}
