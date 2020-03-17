export class ChannelID {
  id: Buffer = new Buffer('todo')
}

export interface Channel {
  readonly id: ChannelID
}
