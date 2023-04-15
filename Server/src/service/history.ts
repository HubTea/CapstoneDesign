import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as stream from 'stream';
import * as express from 'express';
import * as sequelize from 'sequelize';
import * as tf from '@tensorflow/tfjs-node';
import { RepositoryCollection } from './databaseConnectionContainer';
import { 
    HistoryCreationDto,
    HistoryDto,
    HistoryListDto
} from '../dto';
import { UserService } from './user';
import { 
    Unauthorized,
    NotFound
} from '../error';

// let app = express();

// app.listen(9090);
// app.use(express.static('../../CapstoneConfig/tensorflow'));

@Injectable()
export class HistoryService {
    readonly historyImageDirectory = '../../CapstoneConfig/historyImage';
    readonly imageSuffix = 'jpg';
    readonly modelPromise: Promise<tf.GraphModel>;

    constructor(readonly userService: UserService) {
        this.modelPromise = tf.loadGraphModel(
            'http://localhost:9090/model.json'
        );
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

    async getList(repository: RepositoryCollection) {
        let rawList = await repository.history.findAll({
            include: [repository.fish]
        });
        let historyListDto = new HistoryListDto();

        for(let element of rawList) {
            let dto = new HistoryDto();

            if(!element.fish) {
                continue;
            }

            dto.label = element.fish.name!;
            dto.latitude = element.latitude!;
            dto.longitude = element.longitude!;
            dto.timestamp = element.createdTime!.toISOString();
            historyListDto.list.push(dto);
        }

        return historyListDto;
    }

    async putFishImage(
        repository: RepositoryCollection,
        account: string,
        historyId: number,
        req: express.Request
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

        let dirPath = `${this.historyImageDirectory}/${account}`;        
        let filePath = `${dirPath}/${historyId}.${this.imageSuffix}`;
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

    async classify(
        repository: RepositoryCollection, 
        account: string,
        historyId: number
    ) {
        let user = await repository.user.findOne({
            where: {
                account: account
            }
        });
        let history = await repository.history.findOne({
            where: {
                id: historyId
            }
        });

        if(!user || !history) {
            throw new NotFound(null);
        }

        if(user.id! != history.userId!) {
            throw new Unauthorized(null);
        }

        let filePath = 
            `${this.historyImageDirectory}/${account}/` + 
            `${historyId}.${this.imageSuffix}`;
        let fileBuffer = await fs.promises.readFile(filePath);
        let fileArrayBuffer = new Uint8Array(
            fileBuffer.buffer, fileBuffer.byteOffset, fileBuffer.byteLength
        );
        let image3d = tf.node.decodeJpeg(fileArrayBuffer);
        let image4d = tf.reshape(
            image3d, [1, image3d.shape[0], image3d.shape[1], 3]
        );
        let model = await this.modelPromise;
        let output = await model.executeAsync(image4d) as tf.Tensor[];
        let scoreList = (output[7].arraySync() as number[][][])[0][0];
        let argMax = scoreList.indexOf(Math.max(...scoreList));
        let table = [
            '',
            'black sea sprat',
            'gilt head bream',
            'horse mackerel',
            'red mullet',
            'red sea bream',
            'sea bass',
            'shrimp',
            'striped red mullet',
            'trout'
        ];

        if(argMax == 0) {
            throw new NotFound(null);
        }

        let result = table[argMax];
        let fish = await repository.fish.findOne({
            where: {
                name: result
            }
        });

        if(!fish) {
            throw new NotFound(null);
        }

        await repository.history.upsert({
            id: history.id!,
            fishId: fish.id!
        });
        return result;
    }
}