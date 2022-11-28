import * as joi from 'joi';
import { makeSchema } from './utility/joi';

export class DatabaseConfig {
    host: string = '';
    port: number = 0;
    database: string = '';
    username: string = '';
    password: string = '';
}

export let databaseConfigSchema = makeSchema<DatabaseConfig>({
    host: joi.string().required(),
    port: joi.number().required(),
    database: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required()
});

export class DatabaseReplicationConfig {
    write: DatabaseConfig = new DatabaseConfig();
    read: DatabaseConfig[] = [];
}

export let databaseReplicationConfigSchema = 
makeSchema<DatabaseReplicationConfig>({
    write: databaseConfigSchema,
    read: joi.array().items(databaseConfigSchema).required()
});

export class Config {
    databaseReplication: DatabaseReplicationConfig = 
        new DatabaseReplicationConfig();
    jwtSecret: string = '';
}

export let configSchema = makeSchema<Config>({
    databaseReplication: databaseReplicationConfigSchema,
    jwtSecret: joi.string().required()
});

// export class StaticConfig {
//     configServerHost: string = '';
//     configServerPort: number = 0;
// }

// let staticConfigSchemaDefinition: SamePropertyName<StaticConfig> = {
//     configServerHost: joi.string().required(),
//     configServerPort: joi.number().required()
// }
// export let staticConfigSchema = joi.object(staticConfigSchemaDefinition);