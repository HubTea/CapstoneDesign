import init from './init';
import { DatabaseConfig } from '../src/configSchema';

async function main() {
    let config = new DatabaseConfig();

    config.host = process.argv[2];
    config.port = parseInt(process.argv[3]);
    config.database = process.argv[4];
    config.username = process.argv[5];
    config.password = process.argv[6];

    await init(config, {
        force: true,
        logging: false
    });
}

main();