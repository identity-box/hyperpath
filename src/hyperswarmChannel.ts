import { Channel, ChannelId } from './channel'
import { ConnectionInfo } from './connectionInfo'

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
      this.hyperSwarm.join(this.id.bytes)
    })
  }
}

export class HyperSwarmConnectionInfo implements ConnectionInfo {
  peerId: ChannelId

  constructor(peerId: ChannelId) {
    this.peerId = peerId
  }
}

type EventType = 'connection'

export interface Callback {
  (socket: any, info: any): void
}

export interface HyperSwarm {
  join(topic: Uint8Array): void
  on(event: EventType, callback: Callback): void
}
