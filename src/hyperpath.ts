import { Channel, ChannelID } from './channel'
import { HyperSwarmChannel } from './hyperswarmChannel'

export class HyperPath {
  createChannel(id?: Uint8Array): Channel {
    const channelId = id ? ChannelID.create(id) : ChannelID.createRandom()
    return new HyperSwarmChannel(channelId)
  }
}
