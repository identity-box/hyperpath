export as namespace hyperswarm

type EventType = 'connection'

export interface Callback {
  (socket: any, info: any): void
}

export interface HyperSwarm {
  join(topic: Uint8Array): void
  on(event: EventType, callback: Callback): void
}
