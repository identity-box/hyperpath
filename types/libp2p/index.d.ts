// export as namespace Libp2p

export = Libp2p

// import KadDHT from 'libp2p-kad-dht'
import PeerInfo from 'peer-info'

declare class Libp2p {
  peerInfo: PeerInfo

  start(): Promise<void>
  on(event: Libp2p.Event, handler: Libp2p.PeerInfoHandler): void
  static create(options: Libp2p.CreateOptions): Promise<Libp2p>
}

declare namespace Libp2p {
  export interface Module {}

  export interface CreateOptions {
    modules: {
      transport: Module[]
      streamMuxer: Module[]
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
  }

  type Event = 'peer:connect' | 'peer:disconnect' | 'peer:discovery'

  type PeerInfoHandler = (peerInfo: PeerInfo) => void
}
