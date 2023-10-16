import { Controller, Body, Post } from '@nestjs/common';
import { Config } from '../configSchema';
import { bridge } from '../service/bridge';

@Controller('/config')
export class AgentController {
  @Post()
  update(@Body() config: Config) {
    bridge.emit(config);
  }
}
