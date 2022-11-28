import { Module } from '@nestjs/common';
import { PostService } from './service/post';
import { UserService} from './service/user';
import { AuthenticationService } from './service/authentication';
import { CategoryService } from './service/category';

import { PostController } from './controller/post';
import { UserController } from './controller/user';
import { AuthenticationController} from './controller/authentication';
import { CategoryController } from './controller/category';

import { 
  DatabaseConnectionContainer 
} from './service/databaseConnectionContainer';
import { ConfigContainer } from './service/configContainer';
import { ConfigListener } from './service/configListener';

@Module({
  controllers: [
    PostController, 
    UserController, 
    AuthenticationController,
    CategoryController
  ],
  providers: [
    PostService, 
    UserService, 
    AuthenticationService,
    CategoryService,

    DatabaseConnectionContainer,
    ConfigContainer,
    ConfigListener
  ],
})
export class AppModule {

}
