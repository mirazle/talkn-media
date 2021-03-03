docker build . -t mirazle/talkn-live-medias
docker run -it --rm -p 80:80 mirazle/talkn-live-media
docker run -it --rm -p 80:80 mirazle/talkn-live-media /bin/bash --login

aws lightsail push-container-image --service-name talkn-live-media --label node --image mirazle/talkn-live-media:latest
