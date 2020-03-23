import { randomBytes } from 'tweetnacl'

export class ChannelID {
  bytes: Uint8Array

  static createRandom(): ChannelID {
    const idSize = 32
    const bytes = randomBytes(idSize)
    return new ChannelID(bytes)
  }

  static create(id: Uint8Array): ChannelID {
    if (id.length != 32) {
      throw new TypeError(
        `ChannelID requires 32 bytes, but received ${id.length}`
      )
    }
    return new ChannelID(id)
  }

  private constructor(bytes: Uint8Array) {
    this.bytes = bytes
  }
}

export interface Channel {
  readonly id: ChannelID
}
