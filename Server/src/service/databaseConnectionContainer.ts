import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Config } from '../configSchema';

@Injectable()
export class DatabaseConnectionContainer {
    sequelize?: Sequelize;
    resolve?: any;
    reject?: any;

    update(config: Config) {
        let oldSequelize = this.sequelize;

        this.sequelize = new Sequelize({
            dialect: 'postgres',
            replication: config.databaseReplication
        }) 

        if(!oldSequelize && this.resolve) {
            this.resolve(this.sequelize);
        }
    }

    async get(): Promise<Sequelize> {
        if(this.sequelize) {
            return this.sequelize;
        }
        else {
            return new Promise(this.execute.bind(this));
        } 
    }

    execute(resolve: any, reject: any) {
        this.resolve = resolve;
        this.reject = reject;
    }
}