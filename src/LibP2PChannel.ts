import WebSockets from 'libp2p-websockets'
import WebRTCStar from 'libp2p-webrtc-star'
import MPLEX from 'libp2p-mplex'
// import KadDHT from 'libp2p-kad-dht'
import { Channel, ChannelId } from './Channel'
import { ILibP2P, NodeCreator } from './ILibP2P'
import Bootstrap from 'libp2p-bootstrap'
import multiaddr from 'multiaddr'
import PeerId from 'peer-id'
import { CreateOptions } from 'libp2p'

const signallingServer = '127.0.0.1'

export class LibP2PChannel implements Channel {
  channelId: ChannelId
  key = null
  node: ILibP2P | null = null
  wrappedChannel = null
  nodeCreator: NodeCreator
  log = console.debug
  myId: PeerId

  constructor(myId: PeerId, id: ChannelId, nodeCreator: NodeCreator) {
    this.myId = myId
    this.channelId = id
    this.nodeCreator = nodeCreator
  }

  async connect() {
    this.node = await this.nodeCreator(config)
    const webrtcAddr = `/ip4/${signallingServer}/tcp/9090/wss/p2p-webrtc-star`
    if (this.node) {
      this.node.peerInfo.multiaddrs?.add(multiaddr(webrtcAddr))

      await this.node.start()
      this.log('This node id', this.node.peerInfo.id.toB58String())
    }
  }
}

const config: CreateOptions = {
  modules: {
    transport: [WebSockets, WebRTCStar],
    streamMuxer: [MPLEX],
    peerDiscovery: [Bootstrap]
  },
  config: {
    peerDiscovery: {
      bootstrap: {
        enabled: true,
        // interval: 20e3,
        list: [
          '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
          '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
          '/dns4/sfo-3.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
          '/dns4/sgp-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu',
          '/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
          '/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64'
        ]
      }
    }
    // dht: {
    //   enabled: true,
    //   kBucketSize: 20,
    //   randomWalk: {
    //     enabled: true
    //   }
    // }
  }
}
