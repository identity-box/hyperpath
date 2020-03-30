import Libp2p, { CreateOptions } from 'libp2p'

export interface ILibP2P extends Libp2p {
  start(): Promise<void>
}

export type NodeCreator = (options: CreateOptions) => Promise<ILibP2P>
