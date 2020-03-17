import { Channel } from './channel'
import { HyperSwarmChannel } from './hyperswarmChannel'

export class HyperPath {
  createChannel(): Channel {
    return new HyperSwarmChannel()
  }
}
