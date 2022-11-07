export class AuthenticationDto {
    account: string = '';
    password: string = '';
}

export class UserCreationDto extends AuthenticationDto {
    nickname: string = '';
}

export class AuthenticationResultDto {
    token: string = '';
}

export class CategoryCreationDto {
    label: string = '';
}

export class CategoryListDto {
    list: string[] = [];
}

export class PostCreationDto {
    title: string = '';
    content: string = '';
    category: string = ''
}

export class CursorContainer {
    cursor?: string = '';
}

export class PostListQueryDto extends CursorContainer{
    category?: string;
}

export class CommentListQueryDto extends CursorContainer{

}

export class ListDto<T> extends CursorContainer {
    list: T[] = [];
}

export class UserDto {
    id: number = 0;
    nickname: string = '';
}

export class SimplePostDto {
    id: number = 0;
    title: string = '';
    creationTime: string = '';
    viewCount: number = 0;
    likeCount: number = 0;
    dislikeCount: number = 0;
    category: string = '';
    user: UserDto = new UserDto();
}

export class FullPostDto extends SimplePostDto{
    content: string = '';
}

export class CommentCreationDto {
    content: string = '';
}

export class CommentDto extends CommentCreationDto {
    creationTime: string = '';
    user: UserDto = new UserDto();
}

export class HistoryCreationDto {
    latitude: number = 0;
    longitude: number = 0;
    timestamp: string = '';
}

export class HistoryCreationResultDto {
    id: number = 0;
}

export class FishClassDto {
    label: string = '';
}