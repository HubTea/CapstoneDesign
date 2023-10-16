import { Controller, Body, Get, Post } from '@nestjs/common';
import { DatabaseConnectionContainer } from '../service/databaseConnectionContainer';
import { CategoryService } from '../service/category';
import { CategoryCreationDto } from '../dto';

@Controller('/category')
export class CategoryController {
  constructor(
    readonly databaseConnectionContainer: DatabaseConnectionContainer,
    readonly categoryService: CategoryService,
  ) {}

  @Post()
  async register(@Body() categoryCreationDto: CategoryCreationDto) {
    const repository = this.databaseConnectionContainer.get().repository;

    await this.categoryService.register(repository, categoryCreationDto);
  }

  @Get()
  async getList() {
    const repository = this.databaseConnectionContainer.get().repository;

    return await this.categoryService.getList(repository);
  }
}
