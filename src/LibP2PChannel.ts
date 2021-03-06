import WebSockets from 'libp2p-websockets'
import WebRTCStar from 'libp2p-webrtc-star'
import SECIO from 'libp2p-secio'
import MPLEX from 'libp2p-mplex'
// import KadDHT from 'libp2p-kad-dht'
import { Channel, ChannelId } from './Channel'
import { ILibP2P, NodeCreator } from './ILibP2P'
import Bootstrap from 'libp2p-bootstrap'
import multiaddr from 'multiaddr'
import PeerId from 'peer-id'
import { CreateOptions } from 'libp2p'
import PeerInfo from 'peer-info'

export const signallingServer = '127.0.0.1'
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
    await this.createAndStartNode()
    if (!this.node) return

    if (this.remotePeerId) {
      await this.dial()
    } else {
      await this.listen()
    }

    this.log('connected')
  }

  private async createAndStartNode() {
    this.node = await this.nodeCreator(config(this.myId))
    if (!this.node) return

    const webrtcAddr = `/ip4/${signallingServer}/tcp/9090/wss/p2p-webrtc-star`
    this.node.peerInfo.multiaddrs?.add(multiaddr(webrtcAddr))

    await this.node.start()
    this.log('This node id', this.node.peerInfo.id.toB58String())
  }

  /**
   * Starts the node in "listener" mode: it doesn't know anybody to
   * explicitly connect to, so it listens for incoming connections.
   */
  private async listen() {
    await this.node!.handle(protocol, async ({ connection, stream }) => {
      this.log('listening on stream: ', stream)
      const message = await stream.source.next()
      if (message.value.toString() !== this.channelId.toString()) {
        this.log('invalid channel id; hangup')
        await this.node!.hangUp(connection!.remotePeer)
      }
    })
  }

  /**
   * Starts the node in "dialer" mode: it knows to which peer it
   * should connect, and it knows how to connect.
   */
  private async dial() {
    const remotePeerInfo = new PeerInfo(this.remotePeerId!)
    remotePeerInfo.multiaddrs.add(
      multiaddr(
        `/ip4/${signallingServer}/tcp/9090/wss/p2p-webrtc-star/p2p/` +
        this.remotePeerId!.toB58String()
      )
    )
    const { stream } = await this.node!.dialProtocol(remotePeerInfo, [protocol])
    this.log('dialed stream:', stream)
    stream.sink([this.channelId.toString()])
  }
}

const config: (myId: PeerId) => CreateOptions = myId => ({
  modules: {
    transport: [WebSockets, WebRTCStar],
    connEncryption: [SECIO],
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
  },
  peerInfo: new PeerInfo(myId)
})
