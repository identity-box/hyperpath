import { Channel, ChannelId } from './Channel'
import { ConnectionInfo } from './ConnectionInfo'
import { HyperSwarm } from 'hyperswarm'

export class HyperSwarmChannel implements Channel {
  id: ChannelId
  key = null
  hyperSwarm: HyperSwarm

  constructor(id: ChannelId, hyperSwarm: HyperSwarm) {
    this.id = id
    this.hyperSwarm = hyperSwarm
  }

  connect(): Promise<ConnectionInfo> {
    return new Promise((resolve, reject) => {
      this.hyperSwarm.on('connection', (socket, info) => {
        resolve(new HyperSwarmConnectionInfo(info.peerId))
      })
      this.hyperSwarm.join(this.id.rawBytes)
    })
  }
}

export class HyperSwarmConnectionInfo implements ConnectionInfo {
  peerId: ChannelId

  constructor(peerId: ChannelId) {
    this.peerId = peerId
  }
}
