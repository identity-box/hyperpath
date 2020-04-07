import PeerInfo from 'peer-info'
import PeerId from 'peer-id'
import { ILibP2P, NodeCreator } from '../src/ILibP2P'
import Libp2p from 'libp2p'

export class LibP2PStub implements ILibP2P {
  peerInfo: PeerInfo = new PeerInfo(new PeerId(Buffer.alloc(1, 1)))
  handlers: { [event in Libp2p.Event]?: Libp2p.PeerInfoHandler } = {}
  started = false

  start(): Promise<void> {
    return new Promise(resolve => {
      this.started = true
      resolve()
    })
  }

  on(event: Libp2p.Event, handler: Libp2p.PeerInfoHandler): void {
    this.handlers[event] = handler
  }

  emit(event: Libp2p.Event, peerInfo: PeerInfo) {
    this.handlers[event]?.(peerInfo)
  }
}

export const stubCreator: NodeCreator = () => {
  return new Promise((resolve, reject) => {
    return new LibP2PStub()
  })
}
