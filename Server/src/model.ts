import {
    Model, 
    Table, 
    PrimaryKey,
    AutoIncrement,
    Column,
    HasMany,
    ForeignKey,
    DataType,
    CreatedAt,
    DeletedAt
} from 'sequelize-typescript';

@Table({
    paranoid: true,
    omitNull: true
})
export class User extends Model {
    @Column(DataType.STRING(30))
    nickname: string = '';

    @Column
    hash: string = '';

    @Column
    salt: string = '';

    @Column
    hashVersion: number = 0;

    @Column(DataType.STRING(30))
    account: string = '';

    @Column
    admin: boolean = false;

    @CreatedAt
    createdTime: Date = new Date();

    @DeletedAt
    deletedTime: Date = new Date();

    @HasMany(() => Post)
    postList: Post[] = [];

    @HasMany(() => History)
    historyList: Post[] = [];

    @HasMany(() => Comment)
    commentList: Comment[] = [];
}

@Table({
    paranoid: true,
    omitNull: true
})
export class Post extends Model {
    @Column(DataType.STRING(250))
    title: string = '';

    @Column(DataType.DATE)
    revisedTime: Date = new Date();

    @Column
    viewCount: number = 0;

    @Column
    likeCount: number = 0;

    @Column
    dislikeCount: number = 0;

    @CreatedAt
    createdTime: Date = new Date();

    @DeletedAt
    deletedTime: Date = new Date();

    @ForeignKey(() => User)
    @Column
    writerId: number = 0;

    @ForeignKey(() => Category)
    @Column
    categoryId: number = 0;

    @HasMany(() => Comment)
    commentList: Comment[] = [];
}

@Table({
    timestamps: false,
    omitNull: true
})
export class Category extends Model {
    @Column(DataType.STRING(10))
    label: string = '';

    @HasMany(() => Post)
    postList: Post[] = [];
}

@Table({
    paranoid: true,
    omitNull: true
})
export class Comment extends Model {
    @Column(DataType.STRING(500))
    content: string = '';

    @CreatedAt
    createdTime: Date = new Date();

    @ForeignKey(() => User)
    @Column
    writerId: number = 0;

    @ForeignKey(() => Post)
    @Column
    postId: number = 0;
}

@Table({
    paranoid: true,
    omitNull: true
})
export class History extends Model {
    @Column(DataType.REAL)
    latitude: number = 0;

    @Column(DataType.REAL)
    longitude: number = 0;

    @CreatedAt
    createdTime: Date = new Date();

    @ForeignKey(() => Fish)
    @Column
    fishId: number = 0;

    @ForeignKey(() => User)
    @Column
    userId: number = 0; 
}

@Table({
    timestamps: false,
    omitNull: true
})
export class Fish extends Model {
    @Column(DataType.STRING(100))
    name: string = '';

    @HasMany(() => History)
    historyList: History[] = [];
}