import {
  HyperSwarmChannel,
  HyperSwarmConnectionInfo
} from '../src/hyperswarmChannel'
import { ChannelID } from '../src/channel'

describe('Hyperswarm channel', () => {
  const channelId = ChannelID.createRandom()

  it('has a connect method', async () => {
    const channel = new HyperSwarmChannel(channelId)
    await expect(channel.connect()).resolves.toBeInstanceOf(
      HyperSwarmConnectionInfo
    )
  })
})
