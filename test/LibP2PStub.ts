import PeerInfo from 'peer-info'
import PeerId from 'peer-id'
import { ILibP2P, NodeCreator } from '../src/ILibP2P'
import Libp2p, {
  ProtocolHandler,
  PeerInfoHandler,
  CreateOptions,
  Stream
} from 'libp2p'
import multiaddr from 'multiaddr'
import pushable from 'it-pushable'

export class LibP2PStub implements ILibP2P {
  options?: CreateOptions
  peerInfo: PeerInfo = new PeerInfo(new PeerId(Buffer.alloc(1, 1)))
  handlers: { [event in Libp2p.Event]?: Libp2p.PeerInfoHandler } = {}
  started = false
  handledProtocol?: string
  protocolHandler?: ProtocolHandler
  dialedProtocols: string[] = []
  dialedRemote?: PeerInfo
  sent: string[] = []
  hangUps: (PeerInfo | PeerId | multiaddr | string)[] = []
  incomingMessagesSource: any

  constructor(options?: CreateOptions) {
    this.options = options
  }

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
      this.dialedRemote = remote
      this.dialedProtocols = protocols
      resolve({
        stream: {
          sink: (source: string[]) => {
            this.sent = source
          }
        }
      })
    })
  }

  fakeIncomingDial(dialer: PeerInfo) {
    if (!this.protocolHandler) return

    this.incomingMessagesSource = pushable()
    const stream: Stream = {
      source: this.incomingMessagesSource,
      sink: () => undefined
    }
    this.protocolHandler({
      stream: stream,
      connection: { remotePeer: dialer.id }
    })
  }

  fakeIncomingMessage(message: string) {
    this.incomingMessagesSource.push(message)
  }

  hangUp(peer: PeerInfo | PeerId | multiaddr | string): Promise<void> {
    this.hangUps.push(peer)
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
