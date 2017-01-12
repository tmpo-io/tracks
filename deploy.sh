#!/usr/bin/sh

ng build --aot --prod
npm run sw

ssh bdv rm -r /home/tempo/tracks.1
ssh bdv mkdir /home/tempo/tracks.1
scp -r -C dist/* bdv:/home/tempo/tracks.1

ssh bdv rm -r /home/tempo/tracks.old
ssh bdv mv /home/tempo/tracks /home/tempo/tracks.old
ssh bdv mv /home/tempo/tracks.1 /home/tempo/tracks

