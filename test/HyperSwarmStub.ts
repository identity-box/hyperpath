import { HyperSwarmConnectionInfo } from '../src/HyperSwarmChannel'
import { HyperSwarm, Callback } from 'hyperswarm'
import { ChannelId } from '../src/Channel'

export class HyperSwarmStub implements HyperSwarm {
  peerId = ChannelId.createRandom()
  connectionHandler!: Callback

  join(topic: Uint8Array): void {
    this.connectionHandler(undefined, new HyperSwarmConnectionInfo(this.peerId))
  }

  on(event: 'connection', callback: Callback): void {
    this.connectionHandler = callback
  }
}
