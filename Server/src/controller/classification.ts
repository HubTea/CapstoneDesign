import { Controller, Post, Param, Headers } from '@nestjs/common';
import { HistoryService } from '../service/history';
import { DatabaseConnectionContainer } from '../service/databaseConnectionContainer';
import { AuthenticationService } from '../service/authentication';
import { ConfigContainer } from '../service/configContainer';
import { Unauthorized } from '../error';

@Controller('classification')
export class ClassificationController {
  constructor(
    readonly historyService: HistoryService,
    readonly authenticationService: AuthenticationService,
    readonly databaseConnectionContainer: DatabaseConnectionContainer,
    readonly configContainer: ConfigContainer,
  ) {}

  @Post(':historyId')
  async classify(
    @Headers('Authorization') token: string,
    @Param('historyId') historyIdString: string,
  ) {
    const repository = this.databaseConnectionContainer.get().repository;
    const historyId = parseInt(historyIdString);
    const config = this.configContainer.get();

    const content = this.authenticationService.getPayload(
      token,
      config.jwtSecret,
    );

    if (content.account === null) {
      throw new Unauthorized(null);
    }

    const result = await this.historyService.classify(
      repository,
      content.account,
      historyId,
    );

    return result;
  }
}
