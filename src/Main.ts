import { Channel, ChannelId } from './Channel'
import { EncryptingChannel } from './EncryptingChannel'
import { randomBytes, secretbox } from 'tweetnacl'

export function createChannel(): Channel {
  const channelId = ChannelId.createRandom()
  const key = randomBytes(secretbox.keyLength)
  return new EncryptingChannel(key, new DummyChannel(channelId))
}

export function openChannel(id: Uint8Array, key: Uint8Array): Channel {
  const channelId = ChannelId.create(id)
  return new EncryptingChannel(key, new DummyChannel(channelId))
}

class DummyChannel implements Channel {
  id: ChannelId
  key: Uint8Array | null = null

  constructor(id: ChannelId) {
    this.id = id
  }
}
