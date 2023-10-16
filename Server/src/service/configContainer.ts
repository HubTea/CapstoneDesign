import { Injectable } from '@nestjs/common';
import { Config } from '../configSchema';

@Injectable()
export class ConfigContainer {
  config?: Config;

  update(config: Config) {
    this.config = config;
  }

  get(): Config {
    if (this.config) {
      return this.config;
    } else {
      throw new Error('config not initialized');
    }
  }
}
