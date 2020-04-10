// export as namespace Libp2p

export = Libp2p

// import KadDHT from 'libp2p-kad-dht'
import PeerInfo from 'peer-info'
import PeerId from 'peer-id'
import multiaddr from 'multiaddr'

declare class Libp2p {
  peerInfo: PeerInfo

  static create(options: Libp2p.CreateOptions): Promise<Libp2p>

  start(): Promise<void>

  on(event: Libp2p.Event, handler: Libp2p.PeerInfoHandler): void

  handle(protocol: string, handler: Libp2p.ProtocolHandler): Promise<void>

  dialProtocol(remote: PeerInfo, protocols: string[]): Promise<{ stream: any }>
}

declare namespace Libp2p {
  export interface Module {}

  export interface CreateOptions {
    modules: {
      transport: Module[]
      streamMuxer?: Module[]
      connEncryption?: Module[]
      peerDiscovery?: Module[]
      // dht?: KadDHT
    }
    config: {
      peerDiscovery?: {
        autoDial?: boolean
        bootstrap?: {
          enabled: boolean
          list: string[]
          interval?: number
        }
        mdns?: {
          enabled: boolean
          interval?: number
        }
      }
      dht?: {
        enabled: boolean
        kBucketSize?: number
        randomWalk: {
          enabled: boolean
          interval?: number
          queriesPerPeriod?: number
        }
      }
    }
    peerInfo?: PeerInfo
  }

  type Event = 'peer:connect' | 'peer:disconnect' | 'peer:discovery'

  type PeerInfoHandler = (peerInfo: PeerInfo) => void

  /**
   * The stream sink is a function. The input of that function is
   * processed using `for await ... of`. Simplest use is an array
   * of (one or more) strings. The return value is listed as `void`
   * here as a simplification; in reality it is an onSinkEnd
   * callback (https://github.com/libp2p/js-libp2p-mplex/blob/24841e399afec7a539767a7baffc893d034d0113/src/stream.js#L97).
   */
  type ProtocolHandler = (result: {
    connection?: {
      id: string
      localAddr: multiaddr
      remoteAddr: multiaddr
      localPeer: PeerId
      remotePeer: PeerId
    }
    protocol?: string
    stream: {
      source: AsyncGenerator
      sink: (source: any) => void
    }
  }) => void
}
