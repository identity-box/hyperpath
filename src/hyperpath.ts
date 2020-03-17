import { Channel, ChannelID } from './channel'
import { HyperSwarmChannel } from './hyperswarmChannel'

export class HyperPath {
  async createChannel(): Promise<Channel> {
    const id = await ChannelID.createRandom()
    return new HyperSwarmChannel(id)
  }
}
