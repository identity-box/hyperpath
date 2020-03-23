import { Channel, ChannelID } from './channel'
import { HyperSwarmChannel } from './hyperswarmChannel'

export class HyperPath {
  createChannel(): Channel {
    const channelId = ChannelID.createRandom()
    return new HyperSwarmChannel(channelId)
  }

  openChannel(id: Uint8Array): Channel {
    const channelId = ChannelID.create(id)
    return new HyperSwarmChannel(channelId)
  }
}
