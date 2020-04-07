import Libp2p, { CreateOptions, ProtocolHandler } from 'libp2p'
import PeerInfo from 'peer-info'

export interface ILibP2P extends Libp2p {
  peerInfo: PeerInfo
  start(): Promise<void>
  on(event: Libp2p.Event, handler: Libp2p.PeerInfoHandler): void
  handle(protocol: string, handler: ProtocolHandler): Promise<void>

  dialProtocol(remote: PeerInfo, protocols: string[]): Promise<{ stream: any }>
}

export type NodeCreator = (options: CreateOptions) => Promise<ILibP2P>
