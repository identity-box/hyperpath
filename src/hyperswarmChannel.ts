import { Channel, ChannelID } from './channel'

export class HyperSwarmChannel implements Channel {
  id: ChannelID

  constructor() {
    this.id = new ChannelID()
  }
}
