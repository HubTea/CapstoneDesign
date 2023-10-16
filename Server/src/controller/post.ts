import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Param,
  Headers,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { DatabaseConnectionContainer } from '../service/databaseConnectionContainer';
import { PostService } from '../service/post';
import { AuthenticationService } from '../service/authentication';
import { ConfigContainer } from '../service/configContainer';
import {
  PostCreationDto,
  PostListQueryDto,
  ListDto,
  SimplePostDto,
  CommentCreationDto,
  CommentListQueryDto,
} from '../dto';
import { Unauthorized } from '../error';

@Controller('/post')
export class PostController {
  constructor(
    readonly databaseConnectionContainer: DatabaseConnectionContainer,
    readonly postService: PostService,
    readonly authenticationService: AuthenticationService,
    readonly configContainer: ConfigContainer,
  ) {}

  @Post()
  async register(
    @Body() postCreationDto: PostCreationDto,
    @Headers('Authorization') token: string,
  ) {
    const repository = this.databaseConnectionContainer.get().repository;
    const config = this.configContainer.get();

    const content = this.authenticationService.getPayload(
      token,
      config.jwtSecret,
    );

    if (content.account == null) {
      throw new Unauthorized(null);
    }

    return await this.postService.register(
      repository,
      content.account,
      postCreationDto,
    );
  }

  @Get()
  async getList(
    @Query() key: PostListQueryDto,
  ): Promise<ListDto<SimplePostDto>> {
    const repository = this.databaseConnectionContainer.get().repository;
    let categoryLabel: string | null = null;
    let cursorString: string | null = null;

    if (key.category != undefined) {
      categoryLabel = key.category;
    }

    if (key.cursor != undefined) {
      cursorString = key.cursor;
    }

    return await this.postService.getList(
      repository,
      categoryLabel,
      cursorString,
    );
  }

  @Get('/:postId')
  async getPost(@Param('postId') postIdString: string) {
    const postId = parseInt(postIdString);
    const repository = this.databaseConnectionContainer.get().repository;

    return await this.postService.getPost(repository, postId);
  }

  @Post('/:postId/comment')
  async writeComment(
    @Param('postId') postIdString: string,
    @Headers('Authorization') token: string,
    @Body() commentCreationDto: CommentCreationDto,
  ) {
    const repository = this.databaseConnectionContainer.get().repository;
    const config = this.configContainer.get();
    const payload = this.authenticationService.getPayload(
      token,
      config.jwtSecret,
    );
    const postId = parseInt(postIdString);

    if (!payload.account) {
      throw new Unauthorized(null);
    }

    await this.postService.writeComment(
      repository,
      payload.account,
      postId,
      commentCreationDto,
    );
  }

  @Get(':postId/comment')
  async getCommentList(
    @Param('postId') postIdString: string,
    @Body() commentListQueryDto: CommentListQueryDto,
  ) {
    const repository = this.databaseConnectionContainer.get().repository;
    const postId = parseInt(postIdString);
    let cursor: string | null = null;

    if (commentListQueryDto.cursor != undefined) {
      cursor = commentListQueryDto.cursor;
    }

    return await this.postService.getCommentList(repository, postId, cursor);
  }
}
