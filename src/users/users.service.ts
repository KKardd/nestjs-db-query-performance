import { Injectable } from '@nestjs/common';
import { UsersReposiotory } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersReposiotry: UsersReposiotory) {}
}
