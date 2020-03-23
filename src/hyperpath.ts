import { Channel, ChannelID } from './channel'
import { HyperSwarmChannel } from './hyperswarmChannel'

export class HyperPath {
  async createChannel(id?: Uint8Array): Promise<Channel> {
    const channelId = id ? ChannelID.create(id) : await ChannelID.createRandom()
    return new HyperSwarmChannel(channelId)
  }
}
