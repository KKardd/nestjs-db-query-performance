import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity-typeorm/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersReposiotory {
  constructor(
    @InjectRepository(Users)
    private readonly users: Repository<Users>,
  ) {}
}
