import { Channel, ChannelId } from './Channel'
import { randomBytes, secretbox } from 'tweetnacl'
import Libp2p from 'libp2p'
import { LibP2PChannel } from './LibP2PChannel'
import { NodeCreator } from './ILibP2P'
import PeerId from 'peer-id'

export function createChannel(myId: PeerId): Channel {
  const channelId = ChannelId.createRandom()
  return createLibp2pChannel(myId, channelId)
}

export function openChannel(
  myId: PeerId,
  channelId: ChannelId,
  remoteId: PeerId
): Channel {
  return createLibp2pChannel(myId, channelId, remoteId)
}

function createLibp2pChannel(
  myId: PeerId,
  channelId: ChannelId,
  remoteId?: PeerId
): Channel {
  return new LibP2PChannel(myId, channelId, nodeCreator, remoteId)
}

let nodeCreator = Libp2p.create
export function setNodeCreator(newNodeCreator: NodeCreator) {
  nodeCreator = newNodeCreator
}
