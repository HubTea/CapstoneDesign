import { Controller, Post, Body } from '@nestjs/common';
import { DatabaseConnectionContainer } from '../service/databaseConnectionContainer';
import { UserService } from '../service/user';
import { UserCreationDto } from '../dto';

@Controller('/user')
export class UserController {
  constructor(
    readonly databaseConnectionContainer: DatabaseConnectionContainer,
    readonly userService: UserService,
  ) {}

  @Post()
  async register(@Body() userCreationDto: UserCreationDto) {
    const connection = this.databaseConnectionContainer.get();

    await this.userService.register(connection.repository, userCreationDto);
  }
}
