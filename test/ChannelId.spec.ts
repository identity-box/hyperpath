import { ChannelId } from '../src/Channel'

describe('Channel ID', () => {
  it('can create a random channel id', () => {
    const id1 = ChannelId.createRandom()
    const id2 = ChannelId.createRandom()
    expect(id1.rawBytes).not.toEqual(id2.rawBytes)
  })

  it('can create from byte array', () => {
    const id1 = ChannelId.createRandom()
    const bytes = id1.rawBytes
    const id2 = ChannelId.create(bytes)
    expect(id1.rawBytes).toEqual(id2.rawBytes)
  })

  it('can be encoded and decoded as string', () => {
    const id = ChannelId.createRandom()
    const encoded = id.toString()
    const decoded = ChannelId.fromString(encoded)
    expect(decoded.rawBytes).toEqual(id.rawBytes)
  })
})
