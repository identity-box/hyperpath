import { Channel, ChannelID } from './channel'
import { secretbox } from 'tweetnacl'

export class EncryptingChannel implements Channel {
  key: Uint8Array
  wrappedChannel: Channel

  get id(): ChannelID {
    return this.wrappedChannel.id
  }

  constructor(key: Uint8Array, wrappedChannel: Channel) {
    if (key.length !== secretbox.keyLength) {
      throw new TypeError('key length be `nacl.secretbox.keyLength`')
    }
    this.key = key
    this.wrappedChannel = wrappedChannel
  }
}
