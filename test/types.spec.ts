import { random } from '@cogitojs/crypto'

describe('Types', () => {
  it('random returns a UInt8Array', async () => {
    const bytes = await random(32)
    const actualType = Object.getPrototypeOf(bytes)
    const expectedType = Object.getPrototypeOf(new Uint8Array())
    expect(expectedType).toBe(actualType)
  })
})
