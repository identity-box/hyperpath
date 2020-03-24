import { createChannel, openChannel, setSwarm } from '../src/hyperpath'
import { randomBytes, secretbox } from 'tweetnacl'
import { HyperSwarmStub } from './HyperSwarmStub'

describe('HyperPath', () => {
  beforeEach(() => {
    setSwarm(new HyperSwarmStub())
  })

  describe('create new channel', () => {
    it('creates channel with an auto-generated id', () => {
      const channel = createChannel()
      expect(channel.id).toBeDefined()
      expect(channel.id.rawBytes.length).toBe(32)
      expect(channel.key?.length).toBe(secretbox.keyLength)
    })
  })

  describe('open previously created channel', () => {
    const id = new Uint8Array(32)
    const testKey = randomBytes(secretbox.keyLength)

    it('can be opened with an explicit id', () => {
      const channel = openChannel(id, testKey)
      expect(channel.id.rawBytes).toBe(id)
    })

    it('cannot be opened with invalid id size', () => {
      const invalidId = new Uint8Array(31)
      expect(() => openChannel(invalidId, testKey)).toThrowError(TypeError)
    })

    it('cannot be opened with invalid key size', () => {
      const invalidKey = new Uint8Array(secretbox.keyLength + 1)
      expect(() => openChannel(id, invalidKey)).toThrowError(TypeError)
    })
  })
})
