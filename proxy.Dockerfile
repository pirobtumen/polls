FROM alpine:3.8

RUN apk update
RUN apk add nodejs nodejs-npm
RUN npm install pm2@latest -g

ADD ./backend/proxy.js /backend/proxy.js
ADD ./backend/package* /backend/

WORKDIR /backend
RUN npm ci

CMD /bin/sh -c "pm2-runtime start proxy.js --name proxy -i 1"
