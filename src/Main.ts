import { Channel, ChannelId } from './Channel'
import { EncryptingChannel } from './EncryptingChannel'
import { randomBytes, secretbox } from 'tweetnacl'
import { create } from 'libp2p'
import { LibP2PChannel } from './LibP2PChannel'
import { NodeCreator } from './ILibP2P'

export function createChannel(): Channel {
  const channelId = ChannelId.createRandom()
  const key = randomBytes(secretbox.keyLength)
  return new EncryptingChannel(key, innerChannel(channelId))
}

export function openChannel(id: Uint8Array, key: Uint8Array): Channel {
  const channelId = ChannelId.create(id)
  return new EncryptingChannel(key, innerChannel(channelId))
}

function innerChannel(channelId: ChannelId): Channel {
  return new LibP2PChannel(channelId, nodeCreator)
}

let nodeCreator = create
export function setNodeCreator(newNodeCreator: NodeCreator) {
  nodeCreator = newNodeCreator
}
