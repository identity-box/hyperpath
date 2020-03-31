import { LibP2PChannel } from '../src/LibP2PChannel'
import { ChannelId } from '../src/Channel'
import { LibP2PStub, stubCreator } from './LibP2PStub'

describe('LibP2PChannel', () => {
  const channelId = ChannelId.createRandom()

  it('can be constructed with a default node creator', () => {
    expect(new LibP2PChannel(channelId, stubCreator)).toBeDefined()
  })

  it('when there is no node it does not throw', async () => {
    const channel = new LibP2PChannel(
      channelId,
      () => new Promise(resolve => resolve(undefined))
    )
    await expect(channel.connect()).resolves.toBe(undefined)
  })

  it('has a connect method', async () => {
    const libp2pStub = new LibP2PStub()
    const channel = new LibP2PChannel(
      channelId,
      () => new Promise(resolve => resolve(libp2pStub))
    )
    await channel.connect()
    expect(libp2pStub.started).toBeTruthy()
  })
})
