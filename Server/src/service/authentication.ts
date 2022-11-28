import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { RepositoryCollection } from './databaseConnectionContainer';
import { AuthenticationDto } from '../dto';
import { 
    NotFound,
    Unauthorized
} from '../error';

@Injectable()
export class AuthenticationService {
    async authenticate(
        repository: RepositoryCollection,
        authenticationDto: AuthenticationDto,
        jwtSecret: jwt.Secret
    ) {
        let user = await repository.user.findOne({
            where: {
                account: authenticationDto.account
            }
        });

        if(!user) {
            throw new NotFound(null);
        }

        if(!user.hash || !user.salt) {
            throw new Error('user hash and salt not initialized');
        }

        let authenticated = 
            await bcrypt.compare(authenticationDto.password, user.hash);

        if(!authenticated){
            throw new Unauthorized(null);
        }
            
        let token = jwt.sign(
            {
                account: authenticationDto.account
            }, 
            jwtSecret, 
            {
                expiresIn: '7d'
            }
        )

        return token;
    }
}