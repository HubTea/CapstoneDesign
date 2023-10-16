import { Module } from '@nestjs/common';
import { PostService } from './service/post';
import { UserService } from './service/user';
import { AuthenticationService } from './service/authentication';
import { CategoryService } from './service/category';
import { HistoryService } from './service/history';
import { FishService } from './service/fish';

import { PostController } from './controller/post';
import { UserController } from './controller/user';
import { AuthenticationController } from './controller/authentication';
import { CategoryController } from './controller/category';
import { HistoryController } from './controller/history';
import { FishController } from './controller/fish';
import { ClassificationController } from './controller/classification';
import { AgentController } from './controller/agent';

import { DatabaseConnectionContainer } from './service/databaseConnectionContainer';
import { ConfigContainer } from './service/configContainer';
import { ConfigListener } from './service/configListener';

@Module({
  controllers: [
    PostController,
    UserController,
    AuthenticationController,
    CategoryController,
    FishController,
  ],
  providers: [
    PostService,
    UserService,
    AuthenticationService,
    CategoryService,
    FishService,

    DatabaseConnectionContainer,
    ConfigContainer,
    ConfigListener,
  ],
})
export class AppModule {}

@Module({
  controllers: [AgentController],
})
export class AgentModule {}
