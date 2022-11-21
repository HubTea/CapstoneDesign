import {
    Model, 
    Table, 
    Column,
    HasMany,
    ForeignKey,
    DataType,
    CreatedAt,
    DeletedAt,
    Unique
} from 'sequelize-typescript';

interface UserAttribute {
    nickname?: string | null;
    hash?: string | null;
    salt?: string | null;
    hashVersion?: string | null;
    account?: string | null;
    admin?: boolean | null;
    createdTime?: Date | null;
    deletedTime?: Date | null;
    postList?: Post[] | null;
    historyList?: History[] | null;
    commentList?: Comment[] | null;
}

@Table({
    paranoid: true,
    omitNull: true
})
export class User extends Model<UserAttribute> {
    @Column(DataType.STRING(30))
    nickname: UserAttribute['nickname'];

    @Column
    hash: UserAttribute['hash'];

    @Column
    salt: UserAttribute['salt'];

    @Column
    hashVersion: UserAttribute['hashVersion'];

    @Unique
    @Column(DataType.STRING(30))
    account: UserAttribute['account'];

    @Column
    admin: UserAttribute['admin'];

    @CreatedAt
    createdTime: UserAttribute['createdTime'];

    @DeletedAt
    deletedTime: UserAttribute['deletedTime'];

    @HasMany(() => Post)
    postList: UserAttribute['postList'];

    @HasMany(() => History)
    historyList: UserAttribute['historyList'];

    @HasMany(() => Comment)
    commentList: UserAttribute['commentList'];
}

interface PostAttribute {
    title?: string | null;
    revisedTime?: Date | null;
    viewCount?: number | null;
    likeCount?: number | null;
    dislikeCount?: number | null;
    createdTime?: Date | null;
    deletedTime?: Date | null;
    writerId?: number | null;
    categoryId?: number | null;
    commentList?: Comment | null;
}
@Table({
    paranoid: true,
    omitNull: true
})
export class Post extends Model<PostAttribute> {
    @Column(DataType.STRING(250))
    title: PostAttribute['title'];

    @Column(DataType.DATE)
    revisedTime: PostAttribute['revisedTime'];

    @Column
    viewCount: PostAttribute['viewCount'];

    @Column
    likeCount: PostAttribute['likeCount'];

    @Column
    dislikeCount: PostAttribute['dislikeCount'];

    @CreatedAt
    createdTime: PostAttribute['createdTime'];

    @DeletedAt
    deletedTime: PostAttribute['deletedTime'];

    @ForeignKey(() => User)
    @Column
    writerId: PostAttribute['writerId'];

    @ForeignKey(() => Category)
    @Column
    categoryId: PostAttribute['categoryId'];

    @HasMany(() => Comment)
    commentList: PostAttribute['commentList'];
}

interface CategoryAttribute {
    label?: string | null;
    postList?: Post[] | null;
}

@Table({
    timestamps: false,
    omitNull: true
})
export class Category extends Model<CategoryAttribute> {
    @Unique
    @Column(DataType.STRING(10))
    label: CategoryAttribute['label'];

    @HasMany(() => Post)
    postList: CategoryAttribute['postList'];
}

interface CommentAttribute {
    content?: string | null;
    createdTime?: Date | null;
    writerId?: number | null;
    postId?: number | null;
}

@Table({
    paranoid: true,
    omitNull: true
})
export class Comment extends Model<CommentAttribute> {
    @Column(DataType.STRING(500))
    content: CommentAttribute['content'];

    @CreatedAt
    createdTime: CommentAttribute['createdTime'];

    @ForeignKey(() => User)
    @Column
    writerId: CommentAttribute['writerId'];

    @ForeignKey(() => Post)
    @Column
    postId: CommentAttribute['postId'];
}

interface HistoryAttribute {
    latitude?: number | null;
    longitude?: number | null;
    createdTime?: Date | null;
    fishId?: number | null;
    userId?: number | null;
}

@Table({
    paranoid: true,
    omitNull: true
})
export class History extends Model<HistoryAttribute> {
    @Column(DataType.REAL)
    latitude: HistoryAttribute['latitude'];

    @Column(DataType.REAL)
    longitude:HistoryAttribute['longitude'];

    @CreatedAt
    createdTime: HistoryAttribute['createdTime'];

    @ForeignKey(() => Fish)
    @Column
    fishId: HistoryAttribute['fishId'];

    @ForeignKey(() => User)
    @Column
    userId: HistoryAttribute['userId']; 
}

interface FishAttribute {
    name?: string | null;
    historyList?: History[] | null;
}

@Table({
    timestamps: false,
    omitNull: true
})
export class Fish extends Model<FishAttribute> {
    @Column(DataType.STRING(100))
    name: FishAttribute['name'];

    @HasMany(() => History)
    historyList: FishAttribute['historyList'];
}

