import { Channel, ChannelId } from './channel'
import { HyperSwarmChannel, HyperSwarm, Callback } from './hyperswarmChannel'
import { EncryptingChannel } from './encryptingChannel'
import { randomBytes, secretbox } from 'tweetnacl'

export function createChannel(): Channel {
  const channelId = ChannelId.createRandom()
  const key = randomBytes(secretbox.keyLength)
  return new EncryptingChannel(key, new HyperSwarmChannel(channelId, swarm))
}

export function openChannel(id: Uint8Array, key: Uint8Array): Channel {
  const channelId = ChannelId.create(id)
  return new EncryptingChannel(key, new HyperSwarmChannel(channelId, swarm))
}

let swarm!: HyperSwarm
export function setSwarm(newSwarm: HyperSwarm) {
  swarm = newSwarm
}
