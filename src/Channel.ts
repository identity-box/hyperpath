import { randomBytes } from 'tweetnacl'

/**
 * Common interface for all HyperPath channels.
 */
export interface Channel {
  /**
   *  Unique identifier of the channel.
   */
  readonly channelId: ChannelId

  /**
   *  Encryption key in case this is an encrypted channel.
   */
  readonly key: Uint8Array | null

  /**
   *  A channel can wrap another channel to add functionality.
   */
  readonly wrappedChannel: Channel | null

  connect(): Promise<void>
}

export class ChannelId {
  rawBytes: Uint8Array

  static createRandom(): ChannelId {
    const idSize = 32
    const bytes = randomBytes(idSize)
    return new ChannelId(bytes)
  }

  static create(id: Uint8Array): ChannelId {
    if (id.length !== 32) {
      throw new TypeError(
        `ChannelID requires 32 bytes, but received ${id.length}`
      )
    }
    return new ChannelId(id)
  }

  private constructor(bytes: Uint8Array) {
    this.rawBytes = bytes
  }
}
