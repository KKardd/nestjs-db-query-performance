import { UsersReposiotory } from '../users.repository';

export class DistinctServer {
  constructor(private readonly usersRepository: UsersReposiotory) {}
}
