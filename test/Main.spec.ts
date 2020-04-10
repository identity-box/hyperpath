import { createChannel, openChannel, setNodeCreator } from '../src/Main'
import { stubCreator } from './LibP2PStub'
import PeerId from 'peer-id'
import { Channel, ChannelId } from '../src/Channel'
import { LibP2PChannel } from '../src/LibP2PChannel'

describe('HyperPath', () => {
  const myId = new PeerId(Buffer.alloc(1, 1))

  beforeEach(() => {
    setNodeCreator(stubCreator)
  })

  describe('create new channel', () => {
    it('creates channel with an auto-generated id', () => {
      const channel = createChannel(myId)
      expect(channel.channelId).toBeDefined()
      expect(channel.channelId.rawBytes.length).toBe(32)
    })

    it(`passes the client's peer id to the libp2p channel`, () => {
      const channel = createChannel(myId)
      const innermostChannel = findInnermostChannel(channel) as LibP2PChannel
      expect(innermostChannel.myId).toBe(myId)
    })
  })

  describe('open previously created channel', () => {
    let channelId: ChannelId
    const remoteId = new PeerId(Buffer.alloc(1, 2))

    beforeEach(() => {
      channelId = ChannelId.createRandom()
    })

    it('can be opened with an explicit id', () => {
      const channel = openChannel(myId, channelId, remoteId)
      expect(channel.channelId).toBe(channelId)
    })

    it('passes the remote peer id to the libp2p channel', () => {
      const channel = openChannel(myId, channelId, remoteId)
      const innermostChannel = findInnermostChannel(channel) as LibP2PChannel
      expect(innermostChannel.remotePeerId).toBe(remoteId)
    })
  })
})

function findInnermostChannel(channel: Channel): Channel {
  return channel.wrappedChannel
    ? findInnermostChannel(channel.wrappedChannel)
    : channel
}
