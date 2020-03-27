import { LibP2P, CreateOptions } from 'libp2p'

export interface ILibP2P extends LibP2P {
  start(): Promise<void>
}

export type NodeCreator = (options: CreateOptions) => Promise<ILibP2P>
