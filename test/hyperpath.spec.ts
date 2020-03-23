import { HyperPath } from '../src/hyperpath'
import { Channel } from '../src/channel'

describe('HyperPath', () => {
  let hyperPath: HyperPath

  beforeEach(() => {
    hyperPath = new HyperPath()
  })

  describe('create new channel', () => {
    it('creates channel with an auto-generated id', () => {
      const channel = hyperPath.createChannel()
      expect(channel.id).toBeDefined()
      expect(channel.id.bytes.length).toBe(32)
    })
  })

  describe('open previously created channel', () => {
    it('can be opened with an explicit id', () => {
      const id = new Uint8Array(32)
      const channel = hyperPath.openChannel(id)
      expect(channel.id.bytes).toBe(id)
    })

    it('cannot be opened with too short id', () => {
      const id = new Uint8Array(31)
      expect(() => hyperPath.openChannel(id)).toThrowError(TypeError)
    })

    it('cannot be opened with too long id', () => {
      const id = new Uint8Array(33)
      expect(() => hyperPath.openChannel(id)).toThrowError(TypeError)
    })
  })
})
