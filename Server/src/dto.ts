export class AuthenticationDto {
  account = '';
  password = '';
}

export class UserCreationDto extends AuthenticationDto {
  nickname = '';
}

export class AuthenticationResultDto {
  token = '';
}

export class CategoryCreationDto {
  label = '';
}

export class CategoryListDto {
  list: string[] = [];
}

export class PostCreationDto {
  title = '';
  content = '';
  category = '';
}

export class CursorContainer {
  cursor?: string;
}

export class PostListQueryDto extends CursorContainer {
  category?: string;
}

export class CommentListQueryDto extends CursorContainer {}

export class ListDto<T> extends CursorContainer {
  list: T[] = [];
}

export class UserDto {
  id = 0;
  nickname = '';
}

export class SimplePostDto {
  id = 0;
  title = '';
  creationTime = '';
  viewCount = 0;
  likeCount = 0;
  dislikeCount = 0;
  category = '';
  user: UserDto = new UserDto();
}

export class FullPostDto extends SimplePostDto {
  content = '';
}

export class CommentCreationDto {
  content = '';
}

export class CommentDto extends CommentCreationDto {
  creationTime = '';
  user: UserDto = new UserDto();
}

export class HistoryCreationDto {
  latitude = 0;
  longitude = 0;
  timestamp = '';
}

export class HistoryCreationResultDto {
  id = 0;
}

export class FishClassDto {
  label = '';
}

export class JwtContent {
  account: string | null = null;
}

export class HistoryDto {
  latitude = 0;
  longitude = 0;
  timestamp = '';
  label = '';
}

export class HistoryListDto {
  list: HistoryDto[] = [];
}
