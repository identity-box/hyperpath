import { random } from '@cogitojs/crypto'

export class ChannelID {
  bytes: Uint8Array

  static async createRandom(): Promise<ChannelID> {
    const idSize = 32
    const randomBytes = await random(idSize)
    return new ChannelID(randomBytes)
  }

  private constructor(bytes: Uint8Array) {
    this.bytes = bytes
  }
}

export interface Channel {
  readonly id: ChannelID
}
