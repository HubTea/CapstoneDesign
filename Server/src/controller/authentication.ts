import { 
    Controller,
    Body,
    Post
} from '@nestjs/common';
import { ConfigContainer } from '../service/configContainer';
import { 
    DatabaseConnectionContainer 
} from '../service/databaseConnectionContainer';
import { AuthenticationService } from '../service/authentication';
import { AuthenticationDto } from '../dto';

@Controller('/auth')
export class AuthenticationController {
    constructor(
        readonly configContainer: ConfigContainer,
        readonly databaseConnectionContainer: DatabaseConnectionContainer,
        readonly authenticationService: AuthenticationService
    ) {

    }

    @Post()
    async authenticate(@Body() authenticationDto: AuthenticationDto) {
        let jwtSecret = this.configContainer.get().jwtSecret;
        let repository = this.databaseConnectionContainer.get().repository;

        let token = await this.authenticationService.authenticate(
            repository, authenticationDto, jwtSecret
        );

        return {
            token: token
        };
    }
}