import { Injectable } from '@nestjs/common';
import * as sequelize from 'sequelize';
import { RepositoryCollection } from './databaseConnectionContainer';
import { 
    PostCreationDto,
    ListDto,
    SimplePostDto,
    FullPostDto
} from '../dto';
import { NotFound } from '../error';
import { 
    PostAttribute,
    Post
} from '../model';

@Injectable()
export class PostService {
    async register(
        repository: RepositoryCollection,
        account: string,
        postCreationDto: PostCreationDto
    ) {
        let category = await this.getCategory(
            repository, postCreationDto.category
        );

        let writer = await repository.user.findOne({
            where: {
                account: account
            }
        });

        if(writer == null) {
            throw new NotFound(null);
        }

        await repository.post.create({
            title: postCreationDto.title,
            content: postCreationDto.content,
            categoryId: category.id,
            writerId: writer.id!,
            viewCount: 0,
            likeCount: 0,
            dislikeCount: 0
        });
    }

    async getList(
        repository: RepositoryCollection, 
        categoryLabel: string | null, 
        cursorString: string | null,
    ): Promise<ListDto<SimplePostDto>> {
        let listLength = 30;
        let limit = listLength + 1;
        let where: sequelize.WhereOptions<PostAttribute> = {};

        if(typeof categoryLabel == 'string') {
            let category = await this.getCategory(repository, categoryLabel);

            where.categoryId = category.id;
        }

        if(typeof cursorString == 'string') {
            where.id = {
                [sequelize.Op.lt]: cursorString.toString()
            }
        }

        let rawList = await repository.post.findAll({
            where: where,
            include: [repository.user, repository.category],
            limit: limit, 
            order: [['id', 'DESC']]
        });

        let listDto = new ListDto<SimplePostDto>();
        let bound = rawList.length;

        if(rawList.length == limit) {
            bound = listLength;
            listDto.cursor = rawList[listLength - 1].id;
        }
        
        for(let i = 0; i < bound; ++i) {
            let element = rawList[i];
            let dto = new SimplePostDto();

            this.assignPostToSimplePostDto(dto, element);
            listDto.list.push(dto);
        }

        return listDto;
    }

    async getPost(repository: RepositoryCollection, postId: number) {
        let post = await repository.post.findOne({
            where: {
                id: postId
            },
            include: [repository.category, repository.user]
        });

        if(!post) {
            throw new NotFound(null);
        }

        let dto = new FullPostDto();

        this.assignPostToFullPostDto(dto, post);
        return dto;
    }

    private async getCategory(repository: RepositoryCollection, label: string) {
        let category = await repository.category.findOne({
            where: {
                label: label
            }
        });

        if(!category) {
            throw new NotFound(null);
        }

        return category;
    }

    private assignPostToSimplePostDto(dto: SimplePostDto, post: Post) {
        dto.id = post.id!;
        dto.title = post.title!;
        dto.creationTime = post.createdTime!.toISOString();
        dto.viewCount = post.viewCount!;
        dto.likeCount = post.likeCount!;
        dto.dislikeCount = post.dislikeCount!;
        dto.category = post.category!.label!;
        dto.user.id = post.writer!.id!;
        dto.user.nickname = post.writer!.nickname!;
    }

    private assignPostToFullPostDto(dto: FullPostDto, post: Post) {
        this.assignPostToSimplePostDto(dto, post);
        dto.content = post.content!;
    }
}