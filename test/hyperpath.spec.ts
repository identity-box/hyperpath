import { HyperPath } from '../src/hyperpath'
import { Channel } from '../src/channel'

describe('HyperPath', () => {
  it('can be constructed', () => {
    expect(new HyperPath()).toBeInstanceOf(HyperPath)
  })

  describe('a channel', () => {
    it('has an id', () => {
      const channel: Channel = new HyperPath().createChannel()
      expect(channel.id).toBeDefined()
    })
  })
})
