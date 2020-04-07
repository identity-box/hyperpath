import { createChannel, openChannel, setNodeCreator } from '../src/Main'
import { randomBytes, secretbox } from 'tweetnacl'
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
      expect(channel.key?.length).toBe(secretbox.keyLength)
    })

    it(`passes the client's peer id to the libp2p channel`, () => {
      const channel = createChannel(myId)
      const innermostChannel = findInnermostChannel(channel) as LibP2PChannel
      expect(innermostChannel.myId).toBe(myId)
    })
  })

  describe('open previously created channel', () => {
    let channelId: ChannelId
    const testKey = randomBytes(secretbox.keyLength)
    const remoteId = new PeerId(Buffer.alloc(1, 2))

    beforeEach(() => {
      channelId = ChannelId.createRandom()
    })

    it('can be opened with an explicit id', () => {
      const channel = openChannel(myId, channelId, testKey, remoteId)
      expect(channel.channelId).toBe(channelId)
    })

    it('cannot be opened with invalid key size', () => {
      const invalidKey = new Uint8Array(secretbox.keyLength + 1)
      expect(() =>
        openChannel(myId, channelId, invalidKey, remoteId)
      ).toThrowError(TypeError)
    })

    it('passes the remote peer id to the libp2p channel', () => {
      const channel = openChannel(myId, channelId, testKey, remoteId)
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
