import { 
    Controller,
    Post,
    Param,
    Headers
} from '@nestjs/common';
import { HistoryService } from '../service/history';
import {
    DatabaseConnectionContainer
} from '../service/databaseConnectionContainer';
import { AuthenticationService } from '../service/authentication';
import { ConfigContainer } from '../service/configContainer';
import { Unauthorized } from '../error';

@Controller('classification')
export class ClassificationController {
    constructor(
        readonly historyService: HistoryService,
        readonly authenticationService: AuthenticationService,
        readonly databaseConnectionContainer: DatabaseConnectionContainer,
        readonly configContainer: ConfigContainer
    ) {

    }

    @Post(':historyId')
    async classify(
        @Headers('Authorization') token: string, 
        @Param('historyId') historyIdString: string
    ) {
        let repository = this.databaseConnectionContainer.get().repository;
        let historyId = parseInt(historyIdString);
        let config = this.configContainer.get();

        let content = this.authenticationService.getPayload(
            token, config.jwtSecret
        );

        if(content.account === null) {
            throw new Unauthorized(null);
        }

        let result = await this.historyService.classify(
            repository, content.account, historyId
        );

        return result;
    }
}