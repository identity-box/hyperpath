import { LibP2PChannel, protocol, signallingServer } from '../src/LibP2PChannel'
import { ChannelId } from '../src/Channel'
import { LibP2PStub, stubCreator } from './LibP2PStub'
import PeerId from 'peer-id'
import PeerInfo from 'peer-info'

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
      libp2pStub = new LibP2PStub()
      channel = new LibP2PChannel(
        myId,
        channelId,
        options =>
          new Promise(resolve => {
            libp2pStub.options = options
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
    })

    describe('channel id exchange', () => {
      beforeEach(async () => {
        createTestChannel()
      })

      it('hangs up when it receives incorrect channel id', async () => {
        const invalidChannelId = ChannelId.createRandom().toString()
        const dialer = new PeerInfo(new PeerId(Buffer.alloc(1, 2)))
        libp2pStub.fakeIncomingDial(dialer)
        libp2pStub.fakeIncomingMessage(invalidChannelId)
        await channel.connect()
        expect(libp2pStub.hangUps).toHaveLength(1)
        expect(libp2pStub.hangUps[0]).toEqual(dialer.id)
      })

      it('does not hang up when it receives correct channel id', async () => {
        const dialer = new PeerInfo(new PeerId(Buffer.alloc(1, 2)))
        libp2pStub.fakeIncomingDial(dialer)
        libp2pStub.fakeIncomingMessage(channelId.toString())
        await channel.connect()
        expect(libp2pStub.hangUps).toHaveLength(0)
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

      it('sent the channel id', () => {
        const channelIdString = channelId.toString()
        expect(libp2pStub.sent).toEqual([channelIdString])
      })
    })
  })
})

class LogSpy {
  msg: string | undefined
  args: string[] | undefined

  log(msg: string, args: string[]): void {
    this.msg = msg
    this.args = args
  }

  reset() {
    this.msg = undefined
    this.args = undefined
  }
}

const flushPromises = () =>
  new Promise(resolve => {
    resolve()
  })
