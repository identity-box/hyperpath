import { Channel, ChannelId } from './Channel'
import { secretbox } from 'tweetnacl'

export class EncryptingChannel implements Channel {
  key: Uint8Array
  wrappedChannel: Channel

  get channelId(): ChannelId {
    return this.wrappedChannel.channelId
  }

  constructor(key: Uint8Array, wrappedChannel: Channel) {
    if (key.length !== secretbox.keyLength) {
      throw new TypeError(
        `key length must be ${secretbox.keyLength} but was ${key.length}`
      )
    }
    this.key = key
    this.wrappedChannel = wrappedChannel
  }

  async connect() {
    await this.wrappedChannel.connect()
  }
}
