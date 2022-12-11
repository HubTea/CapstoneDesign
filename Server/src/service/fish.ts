import { Injectable } from '@nestjs/common';
import * as sequelize from 'sequelize';
import * as fs from 'fs';
import { FishClassDto } from '../dto';
import { RepositoryCollection } from './databaseConnectionContainer';
import { AlreadyExist } from '../error';

@Injectable()
export class FishService {
    constructor() {

    }

    async register(repository: RepositoryCollection, fishClass: FishClassDto) {
        try{
            await repository.fish.create({
                name: fishClass.label
            });
        }
        catch(err) {
            if(err instanceof sequelize.UniqueConstraintError) {
                throw new AlreadyExist(err);
            }
        }
    }

    async getList(repository: RepositoryCollection) {
        let rawList = await repository.fish.findAll();
        let list: FishClassDto[] = [];

        for(let element of rawList) {
            let dto = new FishClassDto();

            dto.label = element.name!;
            list.push(dto);
        }

        return list;
    }

    async getImageStream(fishClass: FishClassDto) {
        return fs.createReadStream(
            `../../CapstoneConfig/fishImage/${fishClass.label}.jpg`
        );
    }
}