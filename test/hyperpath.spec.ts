import { HyperPath } from '../src/hyperpath'
import { Channel } from '../src/channel'

describe('HyperPath', () => {
  it('can be constructed', () => {
    expect(new HyperPath()).toBeInstanceOf(HyperPath)
  })

  describe('a channel', () => {
    it('has an id', async () => {
      const channel = await new HyperPath().createChannel()
      expect(channel.id).toBeDefined()
    })

    it('can be created with an explicit id', async () => {
      const id = new Uint8Array(32)
      const channel = await new HyperPath().createChannel(id)
      expect(channel.id.bytes).toBe(id)
    })

    it('cannot be created with too short id', async () => {
      const id = new Uint8Array(31)
      const hyperPath = new HyperPath()
      await expect(hyperPath.createChannel(id)).rejects.toThrowError(TypeError)
    })

    it('cannot be created with too long id', async () => {
      const id = new Uint8Array(33)
      const hyperPath = new HyperPath()
      await expect(hyperPath.createChannel(id)).rejects.toThrowError(TypeError)
    })
  })
})
