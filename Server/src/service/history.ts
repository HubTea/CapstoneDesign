import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as stream from 'stream';
import { Request } from 'express';
import { RepositoryCollection } from './databaseConnectionContainer';
import { HistoryCreationDto } from '../dto';
import { UserService } from './user';
import { Unauthorized } from '../error';

@Injectable()
export class HistoryService {
    constructor(readonly userService: UserService) {

    }

    async register(
        repository: RepositoryCollection,
        account: string,
        historyCreationDto: HistoryCreationDto
    ) {
        let user = await this.userService.getUserByAccount(repository, account);

        let history = await repository.history.create({
            latitude: historyCreationDto.latitude,
            longitude: historyCreationDto.longitude,
            userId: user.id
        });

        return history.id as number;
    }

    async putFishImage(
        repository: RepositoryCollection,
        account: string,
        historyId: number,
        req: Request
    ) {
        let user = await this.userService.getUserByAccount(
            repository, account
        );

        let history = await repository.history.findOne({
            where: {
                id: historyId,
                userId: user.id!
            }
        });

        if(!history) {
            throw new Unauthorized(null);
        }

        let dirPath = `../../CapstoneConfig/historyImage/${account}`;        
        let filePath = `${dirPath}/${historyId}.jpg`;
        let tmpFilePath = `${dirPath}/${historyId}.tmp`;
        let exist: boolean = true;

        try {
            await fs.promises.stat(tmpFilePath);
        }
        catch(err) {
            exist = false;
        }

        if(exist) {
            throw new Error('another request is being processed');
        }

        let fileStream = fs.createWriteStream(tmpFilePath);
        
        await stream.promises.pipeline(req, fileStream);

        try {
            await fs.promises.rename(tmpFilePath, filePath);
        }
        catch(err) {
            await fs.promises.rm(tmpFilePath);
            throw err;
        }
    }
}