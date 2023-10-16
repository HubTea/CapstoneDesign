import { Injectable } from '@nestjs/common';
import { RepositoryCollection } from './databaseConnectionContainer';
import { CategoryCreationDto, CategoryListDto } from '../dto';

@Injectable()
export class CategoryService {
  async register(
    repository: RepositoryCollection,
    categoryCreationDto: CategoryCreationDto,
  ) {
    await repository.category.create({
      label: categoryCreationDto.label,
    });
  }

  async getList(repository: RepositoryCollection) {
    const rawList = await repository.category.findAll();
    const dto = new CategoryListDto();

    for (const element of rawList) {
      dto.list.push(element.label!);
    }

    return dto;
  }
}
