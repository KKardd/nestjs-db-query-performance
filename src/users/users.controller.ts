import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { FilterUserOption } from './enum/filter-user.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServcie: UsersService) {}

  @Get()
  async findAllUsersByFiltering(@Query('filter') type: FilterUserOption) {
    return await this.usersServcie.findAllUsersByFiltering(type);
  }
}
