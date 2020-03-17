import { HyperPath } from '../src/hyperpath'
import { Channel } from '../src/channel'

describe('HyperPath', () => {
  it('can be constructed', () => {
    expect(new HyperPath()).toBeInstanceOf(HyperPath)
  })

  it('can create a channel', () => {
    const channel: Channel = new HyperPath().createChannel()
    expect(channel).toBeDefined()
  })
})
