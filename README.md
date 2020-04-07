# HyperPath

[![CI](https://github.com/identity-box/hyperpath/workflows/CI/badge.svg)][ci]

_!! Work In Progress !!_

## Secure peer-to-peer JSON-RPC channel

HyperPath implements a secure channel between two peers, on top of
[undecided]. This is going to replace [TelePath][telepath-url]
and is currently work in progress.

## Source

This repository can be found on [github][git-repo] and [git-ssb][ssb-repo].

## Development

- Initial setup: `yarn`
- Unit tests: `yarn test` or `yarn test:watch`
- Building: `yarn build`
- Running demo: `yarn demo`
- Running signal server: `yarn server`

## Demo

There is a crude demo included in this repo. This demo requires a
WebRTC signalling server to run on localhost:9090, which you can start
by running:

    yarn server

Then you can run the demo:

    yarn demo

You can then open the demo in two different browser windows (Chromium
and Chrome work for sure). The first window will act as your listener,
the other one as the dialer. First, hit the "Listen" button in the
listener window. As a result, a channel id and encryption key will be
displayed in the listener window. You have to manually copy-paste those
into the appropriate fields of the "Dialer" section in your dialer
window. The other fields will be filled in automatically, don't worry.
Then you hit "Dial" in the dialer window. Currently, you will see the
following error in the console:

    Error: protocol selection failed

I don't yet understand why this doesn't work.

[ci]: https://github.com/identity-box/hyperpath/actions?query=workflow%3ACI
[telepath-url]: https://github.com/identity-box/identity-box/tree/master/workspaces/telepath
[git-repo]: https://github.com/identity-box/hyperpath
[ssb-repo]: http://git.scuttlebot.io/%251U%2BJgFizEZ4MtNPLul5RubrkyAH9yUKzvtCOiF3UheY%3D.sha256
