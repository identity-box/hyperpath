import { HyperPath } from '../src/hyperpath'

describe('HyperPath', () => {
  it('can be constructed', () => {
    expect(new HyperPath()).toBeInstanceOf(HyperPath)
  })
})
