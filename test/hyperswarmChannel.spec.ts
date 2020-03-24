import {
  HyperSwarmChannel,
  HyperSwarmConnectionInfo,
  HyperSwarm,
  Callback
} from '../src/hyperswarmChannel'
import { ChannelID } from '../src/channel'

describe('Hyperswarm channel', () => {
  const channelId = ChannelID.createRandom()

  it('has a connect method', async () => {
    const hyperSwarm = new HyperSwarmStub()
    const channel = new HyperSwarmChannel(channelId, hyperSwarm)
    await expect(channel.connect()).resolves.toEqual(
      new HyperSwarmConnectionInfo(hyperSwarm.peerId)
    )
  })
})

class HyperSwarmStub implements HyperSwarm {
  peerId = ChannelID.createRandom()
  connectionHandler!: Callback

  join(topic: Uint8Array): void {
    this.connectionHandler(undefined, new HyperSwarmConnectionInfo(this.peerId))
  }

  on(event: 'connection', callback: Callback): void {
    this.connectionHandler = callback
  }
}
