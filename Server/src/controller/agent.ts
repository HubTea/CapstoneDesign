import { Controller, Body, Post } from '@nestjs/common';
import { Config, configSchema } from '../configSchema';
import { bridge } from '../service/bridge';

@Controller('/config')
export class AgentController {
  @Post()
  update(@Body() config: Config) {
    const result = configSchema.validate(config);
    if (result.error) {
      throw new Error(`${result}`);
    }
    bridge.emit(config);
  }
}
