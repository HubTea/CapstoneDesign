import * as joi from 'joi';
import { makeSchema } from './utility/joi';

export class DatabaseConfig {
  host = '';
  port = 0;
  database = '';
  username = '';
  password = '';
}

export const databaseConfigSchema = makeSchema<DatabaseConfig>({
  host: joi.string().required(),
  port: joi.number().required(),
  database: joi.string().required(),
  username: joi.string().required(),
  password: joi.string().required(),
});

export class DatabaseReplicationConfig {
  write: DatabaseConfig = new DatabaseConfig();
  read: DatabaseConfig[] = [];
}

export const databaseReplicationConfigSchema =
  makeSchema<DatabaseReplicationConfig>({
    write: databaseConfigSchema,
    read: joi.array().items(databaseConfigSchema).required(),
  });

export class Config {
  databaseReplication: DatabaseReplicationConfig =
    new DatabaseReplicationConfig();
  databaseRetryMax = 0;
  databasePoolMax = 0;
  jwtSecret = '';
}

export const configSchema = makeSchema<Config>({
  databaseReplication: databaseReplicationConfigSchema,
  databaseRetryMax: joi.number().required(),
  databasePoolMax: joi.number().required(),
  jwtSecret: joi.string().required(),
});
