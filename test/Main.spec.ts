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
      const innermostChannel = findInnermostChannel(channel) as LibP2PChannel
      expect(innermostChannel.myId).toBe(myId)
    })
  })

  describe('open previously created channel', () => {
    const channelId = new Uint8Array(32)
    const testKey = randomBytes(secretbox.keyLength)

    it('can be opened with an explicit id', () => {
      const channel = openChannel(myId, channelId, testKey)
      expect(channel.channelId.rawBytes).toBe(channelId)
    })

    it('cannot be opened with invalid id size', () => {
      const invalidId = new Uint8Array(31)
      expect(() => openChannel(myId, invalidId, testKey)).toThrowError(
        TypeError
      )
    })

    it('cannot be opened with invalid key size', () => {
      const invalidKey = new Uint8Array(secretbox.keyLength + 1)
      expect(() => openChannel(myId, channelId, invalidKey)).toThrowError(
        TypeError
      )
    })
  })
})

function findInnermostChannel(channel: Channel): Channel {
  return channel.wrappedChannel
    ? findInnermostChannel(channel.wrappedChannel)
    : channel
}
