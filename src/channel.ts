import { random } from '@cogitojs/crypto'

export class ChannelID {
  id: Buffer = new Buffer('todo')

  static async createRandom(): Promise<ChannelID> {
    const idSize = 32
    const buf = await random(idSize)
    return new ChannelID(Buffer.alloc(idSize, buf))
  }

  private constructor(buf: Buffer) {
    this.id = buf
  }
}

export interface Channel {
  readonly id: ChannelID
}
