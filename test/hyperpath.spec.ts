import { HyperPath } from '../src/hyperpath'
import { Channel } from '../src/channel'

describe('HyperPath', () => {
  let hyperPath: HyperPath

  beforeEach(() => {
    hyperPath = new HyperPath()
  })

  describe('first peer creates channel', () => {
    it('creates channel with an auto-generated id', () => {
      const channel = hyperPath.createChannel()
      expect(channel.id).toBeDefined()
      expect(channel.id.bytes.length).toBe(32)
    })
  })

  describe('second peer joins channel', () => {
    it('can be created with an explicit id', () => {
      const id = new Uint8Array(32)
      const channel = hyperPath.createChannel(id)
      expect(channel.id.bytes).toBe(id)
    })

    it('cannot be created with too short id', () => {
      const id = new Uint8Array(31)
      expect(() => hyperPath.createChannel(id)).toThrowError(TypeError)
    })

    it('cannot be created with too long id', () => {
      const id = new Uint8Array(33)
      expect(() => hyperPath.createChannel(id)).toThrowError(TypeError)
    })
  })
})
