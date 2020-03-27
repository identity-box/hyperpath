declare class LibP2P {
  start(): Promise<void>
}

export type Module = any

export type CreateOptions = {
  modules: {
    transport: [Module]
    streamMuxer: [Module]
    peerDiscovery: [Module]
  }
}

export function create(options: CreateOptions): Promise<LibP2P>
