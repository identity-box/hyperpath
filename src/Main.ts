import { Channel, ChannelId } from './Channel'
import { HyperSwarmChannel } from './HyperSwarmChannel'
import { EncryptingChannel } from './EncryptingChannel'
import { randomBytes, secretbox } from 'tweetnacl'

/* Below imports look real strange I'm sure. The first one imports
 * the real hyperswarm module (through the type declarations in
 * `types/hyperswarm/index.d.ts`). I also want to have an interface
 * that it conforms to, so that I can implement a stub based on that
 * same interface.
 *
 * I haven't been able to do that with one import statement. This
 * has something to do with the combination of how Typescript
 * declaration file work, with the way hyperswarm exports a function,
 * and with rollup. Bottom line: this doesn't look very nice, but it
 * works; change at your own peril. :)
 */
const hyperswarm = require('hyperswarm')
import { HyperSwarm } from 'hyperswarm'

export function createChannel(): Channel {
  const channelId = ChannelId.createRandom()
  const key = randomBytes(secretbox.keyLength)
  return new EncryptingChannel(key, new HyperSwarmChannel(channelId, swarm))
}

export function openChannel(id: Uint8Array, key: Uint8Array): Channel {
  const channelId = ChannelId.create(id)
  return new EncryptingChannel(key, new HyperSwarmChannel(channelId, swarm))
}

let swarm: HyperSwarm = hyperswarm()
export function setSwarm(newSwarm: HyperSwarm) {
  swarm = newSwarm
}
