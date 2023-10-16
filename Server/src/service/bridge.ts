import { Config } from '../configSchema';

export interface BridgeListener {
  receive(config: Config): void;
}

class Bridge {
  listenerList: BridgeListener[] = [];

  register(listener: BridgeListener) {
    this.listenerList.push(listener);
  }

  emit(config: Config) {
    for (const listener of this.listenerList) {
      listener.receive(config);
    }
  }
}

export const bridge = new Bridge();
