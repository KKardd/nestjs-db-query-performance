import { UsersReposiotory } from '../users.repository';

export class DistinctTypeORM {
  constructor(private readonly usersRepository: UsersReposiotory) {}
}
