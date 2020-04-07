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
import PeerInfo from 'peer-info'

const signallingServer = '127.0.0.1'
export const protocol = '/hyperpath/1.0.0'

export class LibP2PChannel implements Channel {
  channelId: ChannelId
  key = null
  node: ILibP2P | null = null
  wrappedChannel = null
  nodeCreator: NodeCreator
  log = console.debug
  myId: PeerId
  remotePeerId?: PeerId

  constructor(
    myId: PeerId,
    id: ChannelId,
    nodeCreator: NodeCreator,
    remotePeerId?: PeerId
  ) {
    this.myId = myId
    this.channelId = id
    this.nodeCreator = nodeCreator
    this.remotePeerId = remotePeerId
  }

  async connect() {
    this.node = await this.nodeCreator(config)
    if (!this.node) return

    const webrtcAddr = `/ip4/${signallingServer}/tcp/9090/wss/p2p-webrtc-star`
    this.node.peerInfo.multiaddrs?.add(multiaddr(webrtcAddr))

    await this.node.start()
    this.log('This node id', this.node.peerInfo.id.toB58String())

    if (this.remotePeerId) {
      const remotePeerInfo = new PeerInfo(this.remotePeerId)
      await this.node.dialProtocol(remotePeerInfo, [protocol])
    } else {
      await this.node.handle(protocol, ({ stream }) => {
        this.log('listening on stream: ', stream)
      })
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
