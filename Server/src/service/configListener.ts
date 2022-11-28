import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { 
    Config,
    configSchema,
    DatabaseConfig
} from '../configSchema';
import { DatabaseConnectionContainer } from './databaseConnectionContainer';
import { ConfigContainer } from './configContainer';

@Injectable()
export class ConfigListener {
    constructor(
        readonly databaseConnectionContainer: DatabaseConnectionContainer,
        readonly configContainer: ConfigContainer
    ) {
        let configFile = fs.readFileSync('../../CapstoneConfig/config.json');
        let rawConfig = JSON.parse(configFile.toString());
        let validation = configSchema.validate(rawConfig);
        
        if(validation.error) {
            throw new Error(`${validation}`);
        }

        let config = validation.value as Config;

        this.update(config);
    }

    update(config: Config) {
        this.databaseConnectionContainer.update(config);
        this.configContainer.update(config);
    }
}