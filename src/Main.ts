import { Channel, ChannelId } from './Channel'
import { HyperSwarmChannel } from './HyperSwarmChannel'
import { EncryptingChannel } from './EncryptingChannel'
import { randomBytes, secretbox } from 'tweetnacl'
import { HyperSwarm } from 'hyperswarm'

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
