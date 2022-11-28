import { Sequelize } from 'sequelize-typescript';
import { SyncOptions } from 'sequelize';
import { DatabaseConfig } from '../src/configSchema';
import * as model from '../src/model';

export default async function init(
    config: DatabaseConfig, syncOption: SyncOptions
) {
    let sequelize = new Sequelize({
        dialect: 'postgres',
        host: config.host,
        port: config.port,
        database: config.database,
        username: config.username,
        password: config.password,
        models: [
            model.User,
            model.Post,
            model.History,
            model.Fish,
            model.Comment,
            model.Category
        ]
    });

    await sequelize.sync(syncOption);
}