import { ILibP2P, NodeCreator } from '../src/ILibP2P'

export class LibP2PStub implements ILibP2P {
  started = false
  start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.started = true
      resolve()
    })
  }
}

export const stubCreator: NodeCreator = () => {
  return new Promise((resolve, reject) => {
    return new LibP2PStub()
  })
}
