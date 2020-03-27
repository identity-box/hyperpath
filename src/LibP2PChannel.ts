import { create, LibP2P } from 'libp2p'
import WebSockets from 'libp2p-websockets'
import MPLEX from 'libp2p-mplex'
import KadDHT from 'libp2p-kad-dht'
import { Channel, ChannelId } from './Channel'
import { ILibP2P, NodeCreator } from './ILibP2P'

export class LibP2PChannel implements Channel {
  id: ChannelId
  key: Uint8Array | null = null
  node: ILibP2P | null = null
  nodeCreator: NodeCreator

  constructor(id: ChannelId, nodeCreator: NodeCreator = create) {
    this.id = id
    this.nodeCreator = nodeCreator
  }

  async connect() {
    this.node = await this.nodeCreator({
      modules: {
        transport: [WebSockets],
        streamMuxer: [MPLEX],
        peerDiscovery: [KadDHT]
      }
    })
    await this.node?.start()
  }
}
