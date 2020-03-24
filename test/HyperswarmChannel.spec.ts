import {
  HyperSwarmChannel,
  HyperSwarmConnectionInfo
} from '../src/HyperSwarmChannel'
import { ChannelId } from '../src/Channel'
import { HyperSwarmStub } from './HyperSwarmStub'

describe('Hyperswarm channel', () => {
  const channelId = ChannelId.createRandom()

  it('has a connect method', async () => {
    const hyperSwarm = new HyperSwarmStub()
    const channel = new HyperSwarmChannel(channelId, hyperSwarm)
    await expect(channel.connect()).resolves.toEqual(
      new HyperSwarmConnectionInfo(hyperSwarm.peerId)
    )
  })
})
