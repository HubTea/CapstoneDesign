import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import { UniqueConstraintError } from 'sequelize';
import { RepositoryCollection } from './databaseConnectionContainer';
import { UserCreationDto } from '../dto';
import { 
    AlreadyExist,
    NotFound,
} from '../error';

@Injectable()
export class UserService {
    async register(
        repository: RepositoryCollection, 
        userCreationDto: UserCreationDto
    ) {
        let salt = await bcrypt.genSalt();
        let hash = await bcrypt.hash(userCreationDto.password, salt);
        let account = userCreationDto.account;
        let dirPath = `../../CapstoneConfig/historyImage/${account}`;

        try {
            let dir = await fs.promises.opendir(dirPath);
            await dir.close();
        }
        catch(err) {
            await fs.promises.mkdir(dirPath);
        }

        try{
            await repository.user.create({
                nickname: userCreationDto.nickname,
                account: account,
                salt: salt,
                hash: hash,
                hashVersion: '0',
                admin: false
            })
        }
        catch(err){
            if(err instanceof UniqueConstraintError) {
                throw new AlreadyExist(err);
            }
            else {
                throw err;
            }
        }
    }

    async getUserByAccount(repository: RepositoryCollection, account: string) {
        let user = await repository.user.findOne({
            where: {
                account: account
            }
        });

        if(!user) {
            throw new NotFound(null);
        }

        return user;
    }
}

