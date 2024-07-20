import { Injectable } from '@nestjs/common';
import { UsersReposiotory } from '../users.repository';

@Injectable()
export class SortServer {
  constructor(private readonly usersRepository: UsersReposiotory) {}
}
