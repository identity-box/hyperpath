import { HyperPath } from '../src/hyperpath'
import { Channel } from '../src/channel'

describe('HyperPath', () => {
  let hyperPath: HyperPath

  beforeEach(() => {
    hyperPath = new HyperPath()
  })

  describe('a channel', () => {
    it('has an auto-generated id', async () => {
      const channel = await hyperPath.createChannel()
      expect(channel.id).toBeDefined()
      expect(channel.id.bytes.length).toBe(32)
    })

    it('can be created with an explicit id', async () => {
      const id = new Uint8Array(32)
      const channel = await hyperPath.createChannel(id)
      expect(channel.id.bytes).toBe(id)
    })

    it('cannot be created with too short id', async () => {
      const id = new Uint8Array(31)
      await expect(hyperPath.createChannel(id)).rejects.toThrowError(TypeError)
    })

    it('cannot be created with too long id', async () => {
      const id = new Uint8Array(33)
      await expect(hyperPath.createChannel(id)).rejects.toThrowError(TypeError)
    })
  })
})
