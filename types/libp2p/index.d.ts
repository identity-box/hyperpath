// export as namespace Libp2p

export = Libp2p

// import KadDHT from 'libp2p-kad-dht'
import PeerInfo from 'peer-info'

declare class Libp2p {
  peerInfo: PeerInfo

  static create(options: Libp2p.CreateOptions): Promise<Libp2p>

  start(): Promise<void>

  on(event: Libp2p.Event, handler: Libp2p.PeerInfoHandler): void

  handle(
    protocol: string,
    handler: (result: { stream: any }) => void
  ): Promise<void>

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
        autoDial?: Boolean
        bootstrap?: {
          enabled: Boolean
          list: String[]
          interval?: Number
        }
        mdns?: {
          enabled: Boolean
          interval?: Number
        }
      }
      dht?: {
        enabled: Boolean
        kBucketSize?: Number
        randomWalk: {
          enabled: Boolean
          interval?: Number
          queriesPerPeriod?: Number
        }
      }
    }
    peerInfo?: PeerInfo
  }

  type Event = 'peer:connect' | 'peer:disconnect' | 'peer:discovery'

  type PeerInfoHandler = (peerInfo: PeerInfo) => void
}
