import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UniqueConstraintError } from 'sequelize';
import { RepositoryCollection } from './databaseConnectionContainer';
import { UserCreationDto } from '../dto';
import { AlreadyExist } from '../error';

@Injectable()
export class UserService {
    async register(
        repository: RepositoryCollection, 
        userCreationDto: UserCreationDto
    ) {
        let salt = await bcrypt.genSalt();
        let hash = await bcrypt.hash(userCreationDto.password, salt);

        try{
            await repository.user.create({
                nickname: userCreationDto.nickname,
                account: userCreationDto.account,
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
}

