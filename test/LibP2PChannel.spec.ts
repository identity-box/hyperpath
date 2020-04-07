import { LibP2PChannel } from '../src/LibP2PChannel'
import { ChannelId } from '../src/Channel'
import { LibP2PStub, stubCreator } from './LibP2PStub'
import PeerInfo from 'peer-info'
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

  describe('after connecting', () => {
    let libp2pStub: LibP2PStub
    let channel: LibP2PChannel
    let logSpy: LogSpy

    beforeEach(async () => {
      libp2pStub = new LibP2PStub()
      channel = new LibP2PChannel(
        myId,
        channelId,
        () => new Promise(resolve => resolve(libp2pStub))
      )
      logSpy = new LogSpy()
      channel.log = (msg: string, args: any[]) => logSpy.log(msg, args)
      await channel.connect()
    })

    it('has started', () => {
      expect(libp2pStub.started).toBeTruthy()
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
}
