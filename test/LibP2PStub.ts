import PeerInfo from 'peer-info'
import PeerId from 'peer-id'
import { ILibP2P, NodeCreator } from '../src/ILibP2P'

export class LibP2PStub implements ILibP2P {
  peerInfo: PeerInfo = new PeerInfo(new PeerId(Buffer.alloc(1, 1)))

  started = false
  start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.started = true
      resolve()
    })
  }
  on(event: any, handler: any): void {
    return undefined
  }
}

export const stubCreator: NodeCreator = () => {
  return new Promise((resolve, reject) => {
    return new LibP2PStub()
  })
}
