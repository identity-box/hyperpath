# HyperPath

[![CI](https://github.com/identity-box/hyperpath/workflows/CI/badge.svg)][ci]

## Secure peer-to-peer JSON-RPC channel

HyperPath implements a secure channel between two peers, on top of
[undecided]. This is going to replace [TelePath][telepath-url]
and is currently work in progress.

## Source

This repository can be found on [github][github-repo] and [git-ssb][ssb-repo].

## Building

For now, this library depends on a [forked js-libp2p][fork]. This fork slightly
changes the exports of libp2p so that it works with Rollup. As soon as the
[pull request][pr] is approved and released, this fork is no longer needed.

So for now, when building, please check out the [fork][fork], and build it:

```
git clone git@github.com:Charterhouse/js-libp2p.git
cd js-libp2p
npm install
npm run build
yarn link
```

Then move over to your HyperPath working copy, and type:

```
yarn link libp2p
```

This will cause the local forked clone to be used instead of the one from NPM.

[ci]: https://github.com/identity-box/hyperpath/actions?query=workflow%3ACI
[telepath-url]: https://github.com/identity-box/identity-box/tree/master/workspaces/telepath
[git-repo]: https://github.com/identity-box/hyperpath
[ssb-repo]: http://git.scuttlebot.io/%251U%2BJgFizEZ4MtNPLul5RubrkyAH9yUKzvtCOiF3UheY%3D.sha256
[fork]: https://github.com/Charterhouse/js-libp2p
[pr]: https://github.com/libp2p/js-libp2p/pull/595
