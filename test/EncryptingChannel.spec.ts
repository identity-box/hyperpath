import { EncryptingChannel } from '../src/EncryptingChannel'
import { Channel, ChannelId } from '../src/Channel'

class ChannelSpy implements Channel {
  id: ChannelId
  key: Uint8Array = null
  connectCalled = false
  wrappedChannel = null

  constructor(id: ChannelId) {
    this.id = id
  }

  connect(): Promise<void> {
    return new Promise(resolve => {
      this.connectCalled = true
      resolve()
    })
  }
}

describe('Encrypting Channel', () => {
  const dummyId = ChannelId.createRandom()
  const dummyKey = new Uint8Array(32).fill(42)
  const channelSpy = new ChannelSpy(dummyId)

  it('wraps another chanel', async () => {
    const channel = new EncryptingChannel(dummyKey, channelSpy)
    expect(channel.id).toBe(dummyId)
    expect(channel.key).toBe(dummyKey)
    await channel.connect()
    expect(channelSpy.connectCalled).toBeTruthy()
  })
})
