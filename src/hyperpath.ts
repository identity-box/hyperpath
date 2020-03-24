import { Channel, ChannelId } from './channel'
import { HyperSwarmChannel } from './hyperswarmChannel'
import { EncryptingChannel } from './encryptingChannel'
import { randomBytes, secretbox } from 'tweetnacl'

export function createChannel(): Channel {
  const channelId = ChannelId.createRandom()
  const key = randomBytes(secretbox.keyLength)
  return new EncryptingChannel(key, new HyperSwarmChannel(channelId))
}

export function openChannel(id: Uint8Array, key: Uint8Array): Channel {
  const channelId = ChannelId.create(id)
  return new EncryptingChannel(key, new HyperSwarmChannel(channelId))
}
