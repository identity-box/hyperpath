import { Channel, ChannelID } from './channel'

export class HyperSwarmChannel implements Channel {
  id: ChannelID
  key = null

  constructor(id: ChannelID) {
    this.id = id
  }
}
