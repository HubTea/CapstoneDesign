import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { RepositoryCollection } from './databaseConnectionContainer';
import { 
    AuthenticationDto,
    JwtContent 
} from '../dto';
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

        let content = new JwtContent();

        content.account = authenticationDto.account;
            
        let token = jwt.sign(
            JSON.parse(JSON.stringify(content)), 
            jwtSecret, 
            {
                expiresIn: '7d'
            }
        )

        return token;
    }

    getPayload(token: string, jwtSecret: string) {
        let payload: jwt.JwtPayload | string | null = null;

        try { 
            payload = jwt.verify(token, jwtSecret);
        }
        catch (err) {
            throw new Unauthorized(err);
        }

        if(
            typeof payload == 'string' ||
            typeof payload!.account != 'string'
        ) {
            throw new Unauthorized(null);
        }

        let content = new JwtContent();

        content.account = payload.account;
        return content;        
    }
}