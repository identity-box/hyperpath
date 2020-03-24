import { Channel, ChannelID } from './channel'
import { ConnectionInfo } from './connectionInfo'

export class HyperSwarmChannel implements Channel {
  id: ChannelID
  key = null

  constructor(id: ChannelID) {
    this.id = id
  }

  connect(): Promise<ConnectionInfo> {
    return new Promise((resolve, reject) => {
      resolve(new HyperSwarmConnectionInfo())
    })
  }
}

export class HyperSwarmConnectionInfo implements ConnectionInfo {}
