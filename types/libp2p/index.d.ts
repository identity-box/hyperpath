// export as namespace Libp2p

export = Libp2p

declare class Libp2p {
  start(): Promise<void>
  static create(options: Libp2p.CreateOptions): Promise<Libp2p>
}

declare namespace Libp2p {
  export interface Module {}

  export interface CreateOptions {
    modules: {
      transport: [Module]
      streamMuxer: [Module]
      peerDiscovery: [Module]
    }
  }
}
