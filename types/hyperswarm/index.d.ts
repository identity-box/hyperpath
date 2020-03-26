export = hyperswarm

declare function hyperswarm(): hyperswarm.HyperSwarm

declare namespace hyperswarm {
  type EventType = 'connection'

  export interface Callback {
    (socket: any, info: any): void
  }
  interface HyperSwarm {
    join(topic: Uint8Array): void
    on(event: EventType, callback: Callback): void
  }
}
