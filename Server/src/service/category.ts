import { Injectable } from '@nestjs/common';
import { RepositoryCollection } from './databaseConnectionContainer';
import { 
    CategoryCreationDto,
    CategoryListDto 
} from '../dto';

@Injectable()
export class CategoryService {
    async register(
        repository: RepositoryCollection,
        categoryCreationDto: CategoryCreationDto
    ) {
        await repository.category.create({
            label: categoryCreationDto.label
        });
    }

    async getList(repository: RepositoryCollection) {
        let rawList = await repository.category.findAll();
        let dto = new CategoryListDto();

        for(let element of rawList) {
            dto.list.push(element.label!);
        }

        return dto;
    }
}