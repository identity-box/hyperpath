import { LibP2PChannel, protocol, signallingServer } from '../src/LibP2PChannel'
import { ChannelId } from '../src/Channel'
import { LibP2PStub, stubCreator } from './LibP2PStub'
import PeerId from 'peer-id'

describe('LibP2PChannel', () => {
  const myId = new PeerId(Buffer.alloc(1, 1))
  const channelId = ChannelId.createRandom()

  it('can be constructed with a default node creator', () => {
    expect(new LibP2PChannel(myId, channelId, stubCreator)).toBeDefined()
  })

  it('when there is no node it does not throw', async () => {
    const channel = new LibP2PChannel(
      myId,
      channelId,
      () => new Promise(resolve => resolve(undefined))
    )
    await expect(channel.connect()).resolves.toBe(undefined)
  })

  describe('connecting', () => {
    let libp2pStub: LibP2PStub
    let channel: LibP2PChannel
    let logSpy: LogSpy

    beforeEach(() => {
      logSpy = new LogSpy()
    })

    function createTestChannel(remoteId?: PeerId) {
      channel = new LibP2PChannel(
        myId,
        channelId,
        options =>
          new Promise(resolve => {
            libp2pStub = new LibP2PStub(options)
            resolve(libp2pStub)
          }),
        remoteId
      )
      channel.log = (msg: string, args: any[]) => logSpy.log(msg, args)
    }

    describe('when listening', () => {
      beforeEach(async () => {
        createTestChannel()
        await channel.connect()
      })

      it('has configuration with own peer info', () => {
        expect(libp2pStub.options?.peerInfo?.id).toBe(myId)
      })

      it('has started', () => {
        expect(libp2pStub.started).toBeTruthy()
      })

      it('has added the signalling server multiaddr', () => {
        const matches = libp2pStub.peerInfo.multiaddrs
          .toArray()
          .map(ma => ma.toString())
          .filter(s => s.includes(signallingServer))
        expect(matches).toHaveLength(1)
      })

      it('has registered the hyperpath protocol', () => {
        expect(libp2pStub.handledProtocol).toBe(protocol)
      })

      it('has a (just logging for now) handler for that protocol', () => {
        const handler = libp2pStub.protocolHandler
        expect(handler).toBeDefined()
        logSpy.reset()
        handler!({ stream: 'foo' })
        expect(logSpy.msg).toBeDefined()
      })
    })

    describe('when dialing', () => {
      let remoteId: PeerId

      beforeEach(async () => {
        remoteId = await PeerId.create({ bits: 512, keyType: 'RSA' })
        createTestChannel(remoteId)
        await channel.connect()
      })

      it('has started', () => {
        expect(libp2pStub.started).toBeTruthy()
      })

      it('has dialed the hyperpath protocol', () => {
        expect(libp2pStub.dialedProtocols).toContain(protocol)
      })

      it('dials a remote with the right peer id', () => {
        const dialedRemote = libp2pStub.dialedRemote
        expect(dialedRemote).toBeDefined()
        expect(dialedRemote?.id).toEqual(remoteId)
      })

      it('has the listener address', () => {
        const matches = libp2pStub
          .dialedRemote!.multiaddrs.toArray()
          .map(ma => ma.toString())
          .filter(
            s =>
              s.includes(signallingServer) && s.includes(remoteId.toB58String())
          )
        expect(matches).toHaveLength(1)
      })
    })
  })
})

class LogSpy {
  msg: String | undefined
  args: String[] | undefined

  log(msg: String, args: String[]): void {
    this.msg = msg
    this.args = args
  }

  reset() {
    this.msg = undefined
    this.args = undefined
  }
}
