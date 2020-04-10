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

You can then open the demo in two different browser windows (Chromium and Chrome
work for sure). The first window will act as your listener, the other one as the
dialer. First, hit the "Listen" button in the listener window. As a result, a
channel id will be generated in the listener window, and it will be put into the
channel id field in the dialer window as well. Now you can click the "Dial"
button in the dialer window and "it should work".

Tip: extended logging of big part of the libp2p stack can be enabled by
typing this in the browser console (and reloading the page afterwards):

    localStorage.debug = '*'

[ci]: https://github.com/identity-box/hyperpath/actions?query=workflow%3ACI
[telepath-url]: https://github.com/identity-box/identity-box/tree/master/workspaces/telepath
[git-repo]: https://github.com/identity-box/hyperpath
[ssb-repo]: http://git.scuttlebot.io/%251U%2BJgFizEZ4MtNPLul5RubrkyAH9yUKzvtCOiF3UheY%3D.sha256
