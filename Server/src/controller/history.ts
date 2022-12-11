import { 
    Controller,
    Post,
    Put,
    Body,
    Param,
    Headers,
    Req
} from '@nestjs/common';
import * as express from 'express';
import * as fs from 'fs';
import * as stream from 'stream';
import {
    DatabaseConnectionContainer
} from '../service/databaseConnectionContainer';
import { HistoryService } from '../service/history';
import { AuthenticationService } from '../service/authentication';
import { UserService } from '../service/user';
import { 
    HistoryCreationDto,
    HistoryCreationResultDto
} from '../dto';
import { ConfigContainer } from '../service/configContainer';
import { Unauthorized } from '../error';

@Controller('history')
export class HistoryController {
    constructor(
        readonly databaseConnectionContainer: DatabaseConnectionContainer,
        readonly historyService: HistoryService,
        readonly authenticationService: AuthenticationService,
        readonly userService: UserService,
        readonly configContainer: ConfigContainer
    ) {

    }

    @Post('/')
    async register(
        @Body() historyCreationDto: HistoryCreationDto,
        @Headers('Authorization') token: string
    ) {
        let repository = this.databaseConnectionContainer.get().repository;
        let config = this.configContainer.get();
        let content = this.authenticationService.getPayload(
            token, config.jwtSecret
        );

        if(content.account == null) {
            throw new Unauthorized(null);
        }

        let result = new HistoryCreationResultDto();
        result.id = await this.historyService.register(
            repository, content.account, historyCreationDto
        );
        
        return result;
    }

    @Put('/:historyId/image')
    async putFishImage(
        @Req() req: express.Request,
        @Param('historyId') historyIdString: string,
        @Headers('Authorization') token: string
    ) {
        let repository = this.databaseConnectionContainer.get().repository;
        let config = this.configContainer.get();
        let historyId = parseInt(historyIdString);
        let content = this.authenticationService.getPayload(
            token, config.jwtSecret
        );
            
        if(content.account == null) {
            throw new Unauthorized(null);
        }
        
        await this.historyService.putFishImage(
            repository, content.account, historyId, req
        );
    }
}