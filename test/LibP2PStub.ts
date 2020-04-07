import PeerInfo from 'peer-info'
import PeerId from 'peer-id'
import { ILibP2P, NodeCreator } from '../src/ILibP2P'
import Libp2p, { ProtocolHandler, PeerInfoHandler } from 'libp2p'

export class LibP2PStub implements ILibP2P {
  peerInfo: PeerInfo = new PeerInfo(new PeerId(Buffer.alloc(1, 1)))
  handlers: { [event in Libp2p.Event]?: Libp2p.PeerInfoHandler } = {}
  started = false
  handledProtocol?: string
  protocolHandler?: (result: { stream: any }) => void

  start(): Promise<void> {
    return new Promise(resolve => {
      this.started = true
      resolve()
    })
  }

  on(event: Libp2p.Event, handler: PeerInfoHandler): void {
    this.handlers[event] = handler
  }

  emit(event: Libp2p.Event, peerInfo: PeerInfo) {
    this.handlers[event]?.(peerInfo)
  }

  handle(protocol: string, handler: ProtocolHandler): Promise<void> {
    return new Promise(resolve => {
      this.handledProtocol = protocol
      this.protocolHandler = handler
      resolve()
    })
  }

  dialProtocol(
    remote: PeerInfo,
    protocols: string[]
  ): Promise<{ stream: any }> {
    return new Promise(resolve => {
      resolve()
    })
  }
}

export const stubCreator: NodeCreator = () => {
  return new Promise((resolve, reject) => {
    return new LibP2PStub()
  })
}
