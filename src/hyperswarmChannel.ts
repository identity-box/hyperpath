import { Channel, ChannelID } from './channel'

export class HyperSwarmChannel implements Channel {
  id: ChannelID

  constructor(id: ChannelID) {
    this.id = id
  }
}
