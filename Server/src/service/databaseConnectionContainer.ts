import { Injectable } from '@nestjs/common';
import {
    Sequelize, 
    Repository 
} from 'sequelize-typescript';
import { Config } from '../configSchema';
import * as model from '../model';

export class RepositoryCollection {
    user: Repository<model.User>;
    post: Repository<model.Post>;
    comment: Repository<model.Comment>;
    history: Repository<model.History>;
    fish: Repository<model.Fish>;
    category: Repository<model.Category>;

    constructor(sequelize: Sequelize) {
        this.user = sequelize.getRepository(model.User);
        this.post = sequelize.getRepository(model.Post);
        this.comment = sequelize.getRepository(model.Comment);
        this.history = sequelize.getRepository(model.History);
        this.fish = sequelize.getRepository(model.Fish);
        this.category = sequelize.getRepository(model.Category);
    }
}

export class DatabaseConnection {
    constructor(
        public sequelize: Sequelize, 
        public repository: RepositoryCollection
    ) {

    }
}

@Injectable()
export class DatabaseConnectionContainer {
    private connection?: DatabaseConnection;

    update(config: Config) {
        let sequelize = new Sequelize('', '', '', {
            dialect: 'postgres',
            replication: config.databaseReplication,
            repositoryMode: true,
            models: [
                model.User,
                model.Post,
                model.Category,
                model.Comment,
                model.Fish,
                model.History
            ],
            retry: {
                max: config.databaseRetryMax
            },
            pool: {
                max: config.databasePoolMax
            }
        });
        let repository = new RepositoryCollection(sequelize);

        this.connection = new DatabaseConnection(sequelize, repository);
    }

    get(): DatabaseConnection {
        if(this.connection) {
            return this.connection;
        }
        else {
            throw new Error('connection not initialized');
        }
    }
}