FROM alpine:3.8

RUN apk update
RUN apk add nodejs nodejs-npm
RUN npm install @vue/cli -g
RUN npm install http-server -g

COPY frontend /frontend-tmp

WORKDIR /frontend-tmp
RUN npm ci
RUN npm run build
RUN cp -R dist /frontend
WORKDIR /frontend

CMD /bin/sh -c "http-server . -p 8080"
