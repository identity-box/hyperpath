#!/bin/sh

set -e

(
  cd vendor/js-libp2p
  npm install
  npm run build
  yarn link
)

yarn link libp2p
