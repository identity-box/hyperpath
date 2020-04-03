FROM balenalib/raspberrypi4-64-node

RUN sudo apt-get update && \
    sudo apt-get install build-essential git python && \
    npm install --global libp2p-webrtc-star

CMD ["star-signal", "--port", "9090", "--host", "0.0.0.0"]
