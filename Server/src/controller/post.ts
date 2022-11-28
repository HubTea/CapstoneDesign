import { 
    Controller, 
    Post, 
    Get,
    Body,
    Query,
    Param,
    Headers
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {
    DatabaseConnectionContainer
} from '../service/databaseConnectionContainer';
import { PostService } from '../service/post';
import { ConfigContainer } from '../service/configContainer';
import { 
    PostCreationDto,
    PostListQueryDto,
    ListDto,
    SimplePostDto
} from '../dto';
import {
    Unauthorized
} from '../error';

@Controller('/post')
export class PostController {
    constructor(
        readonly databaseConnectionContainer: DatabaseConnectionContainer,
        readonly postService: PostService,
        readonly configContainer: ConfigContainer
    ) {

    }

    @Post()
    async register(
        @Body() postCreationDto: PostCreationDto,
        @Headers('Authorization') token: string
    ) {
        let repository = this.databaseConnectionContainer.get().repository;
        let config = this.configContainer.get();
        let payload: jwt.JwtPayload | string | null = null;

        try { 
            payload = jwt.verify(token, config.jwtSecret);
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

        return await this.postService.register(
            repository, payload!.account, postCreationDto
        );
    }

    @Get()
    async getList(
        @Query() key: PostListQueryDto
    ): Promise<ListDto<SimplePostDto>> {
        let repository = this.databaseConnectionContainer.get().repository;
        let categoryLabel: string | null = null;
        let cursorString: string | null = null;

        if(key.category != undefined) {
            categoryLabel = key.category;
        }

        if(key.cursor != undefined) {
            cursorString = key.cursor;
        }
        
        return await this.postService.getList(
            repository, categoryLabel, cursorString
        );
    }

    @Get('/:postId')
    async getPost(@Param('postId') postIdString: string) {
        let postId = parseInt(postIdString);
        let repository = this.databaseConnectionContainer.get().repository;

        return await this.postService.getPost(repository, postId);
    }

    @Post('/:postId/comment')
    async writeComment() {

    }

    @Get(':postId/comment')
    async getCommentList() {

    }
}