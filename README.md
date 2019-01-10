# Polls

Fancy polls web app for learning Vue.js. It has been developed ASAP, so don't expect high quality code, it's jus 4fun :)

The backend is very simple. It's build using node.js + express, and a reverse proxy with redbird.

The polls and votes are keep in memory (RAM), so restarting the app will reset all the stats and data.

### Setup for development

**Console 1** - Launch backend

> cd backend
> npm install
> npm run serve

**Console 2**

> $ cd backend
> $ npm run proxy

**Console 3**

> $ cd frontend
> $ npm install
> $ npm run serve
