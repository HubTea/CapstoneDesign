import { Injectable } from '@nestjs/common';
import * as sequelize from 'sequelize';
import * as fs from 'fs';
import { FishClassDto } from '../dto';
import { RepositoryCollection } from './databaseConnectionContainer';
import { AlreadyExist } from '../error';

@Injectable()
export class FishService {
  async register(repository: RepositoryCollection, fishClass: FishClassDto) {
    try {
      await repository.fish.create({
        name: fishClass.label,
      });
    } catch (err) {
      if (err instanceof sequelize.UniqueConstraintError) {
        throw new AlreadyExist(err);
      }
    }
  }

  async getList(repository: RepositoryCollection) {
    const rawList = await repository.fish.findAll();
    const list: FishClassDto[] = [];

    for (const element of rawList) {
      const dto = new FishClassDto();

      dto.label = element.name!;
      list.push(dto);
    }

    return list;
  }

  async getImageStream(fishClass: FishClassDto) {
    return fs.createReadStream(
      `../../CapstoneConfig/fishImage/${fishClass.label}.jpg`,
    );
  }
}
