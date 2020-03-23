import { HyperPath } from '../src/hyperpath'
import { randomBytes, secretbox } from 'tweetnacl'

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
      expect(channel.key?.length).toBe(secretbox.keyLength)
    })
  })

  describe('open previously created channel', () => {
    const id = new Uint8Array(32)
    const testKey = randomBytes(secretbox.keyLength)

    it('can be opened with an explicit id', () => {
      const channel = hyperPath.openChannel(id, testKey)
      expect(channel.id.bytes).toBe(id)
    })

    it('cannot be opened with invalid id size', () => {
      const invalidId = new Uint8Array(31)
      expect(() => hyperPath.openChannel(invalidId, testKey)).toThrowError(
        TypeError
      )
    })

    it('cannot be opened with invalid key size', () => {
      const invalidKey = new Uint8Array(secretbox.keyLength + 1)
      expect(() => hyperPath.openChannel(id, invalidKey)).toThrowError(
        TypeError
      )
    })
  })
})
