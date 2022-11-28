import {
    Model, 
    Table, 
    Column,
    HasMany,
    BelongsTo,
    ForeignKey,
    DataType,
    CreatedAt,
    DeletedAt,
    Unique
} from 'sequelize-typescript';

interface UserAttribute {
    id?: number | null;
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
export class User extends Model<UserAttribute> implements UserAttribute{
    @Column(DataType.STRING(30))
    nickname: UserAttribute['nickname'];

    @Column(DataType.STRING)
    hash: UserAttribute['hash'];

    @Column(DataType.STRING)
    salt: UserAttribute['salt'];

    @Column(DataType.STRING)
    hashVersion: UserAttribute['hashVersion'];

    @Unique
    @Column(DataType.STRING(30))
    account: UserAttribute['account'];

    @Column(DataType.BOOLEAN)
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

export interface PostAttribute {
    id?: number | null;
    title?: string | null;
    content?: string | null;
    revisedTime?: Date | null;
    viewCount?: number | null;
    likeCount?: number | null;
    dislikeCount?: number | null;
    createdTime?: Date | null;
    deletedTime?: Date | null;
    writerId?: number | null;
    categoryId?: number | null;
    commentList?: Comment | null;
    writer?: User | null;
    category?: Category | null;
}
@Table({
    paranoid: true,
    omitNull: true
})
export class Post extends Model<PostAttribute> implements PostAttribute{
    @Column(DataType.STRING(250))
    title: PostAttribute['title'];

    @Column(DataType.STRING(10000))
    content: PostAttribute['content'];

    @Column(DataType.DATE)
    revisedTime: PostAttribute['revisedTime'];

    @Column(DataType.INTEGER)
    viewCount: PostAttribute['viewCount'];

    @Column(DataType.INTEGER)
    likeCount: PostAttribute['likeCount'];

    @Column(DataType.INTEGER)
    dislikeCount: PostAttribute['dislikeCount'];

    @CreatedAt
    createdTime: PostAttribute['createdTime'];

    @DeletedAt
    deletedTime: PostAttribute['deletedTime'];

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    writerId: PostAttribute['writerId'];

    @ForeignKey(() => Category)
    @Column(DataType.INTEGER)
    categoryId: PostAttribute['categoryId'];

    @HasMany(() => Comment)
    commentList: PostAttribute['commentList'];

    @BelongsTo(() => User)
    writer: PostAttribute['writer'];

    @BelongsTo(() => Category)
    category?: PostAttribute['category'];
}

interface CategoryAttribute {
    id?: number | null;
    label?: string | null;
    postList?: Post[] | null;
}

@Table({
    timestamps: false,
    omitNull: true
})
export class Category 
    extends Model<CategoryAttribute> 
    implements CategoryAttribute {
    @Unique
    @Column(DataType.STRING(10))
    label: CategoryAttribute['label'];

    @HasMany(() => Post)
    postList: CategoryAttribute['postList'];
}

interface CommentAttribute {
    id?: number | null;
    content?: string | null;
    createdTime?: Date | null;
    writerId?: number | null;
    postId?: number | null;
}

@Table({
    paranoid: true,
    omitNull: true
})
export class Comment 
    extends Model<CommentAttribute> 
    implements CommentAttribute {
    @Column(DataType.STRING(500))
    content: CommentAttribute['content'];

    @CreatedAt
    createdTime: CommentAttribute['createdTime'];

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    writerId: CommentAttribute['writerId'];

    @ForeignKey(() => Post)
    @Column(DataType.INTEGER)
    postId: CommentAttribute['postId'];
}

interface HistoryAttribute {
    id?: number | null;
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
export class History 
    extends Model<HistoryAttribute> 
    implements HistoryAttribute {
    @Column(DataType.REAL)
    latitude: HistoryAttribute['latitude'];

    @Column(DataType.REAL)
    longitude:HistoryAttribute['longitude'];

    @CreatedAt
    createdTime: HistoryAttribute['createdTime'];

    @ForeignKey(() => Fish)
    @Column(DataType.INTEGER)
    fishId: HistoryAttribute['fishId'];

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId: HistoryAttribute['userId']; 
}

interface FishAttribute {
    id?: number | null;
    name?: string | null;
    historyList?: History[] | null;
}

@Table({
    timestamps: false,
    omitNull: true
})
export class Fish extends Model<FishAttribute> implements FishAttribute {
    @Column(DataType.STRING(100))
    name: FishAttribute['name'];

    @HasMany(() => History)
    historyList: FishAttribute['historyList'];
}

