<template>
  <div id="app">
    <div id="nav">
      <div class="title">Polls</div>
      <div class="sections">
        <router-link to="/">Home</router-link> |
        <router-link to="/new-poll">New poll</router-link>
      </div>
      <div></div>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
html, body {
  height: 100%;
  margin: 0;
}

body {
  padding-left: 15px;
  padding-right: 15px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  .title {
    color: #0070C0;
    font-size: 40px;
    font-weight: bold;
    align-self: flex-start;
    margin-right: 30px;
  }

  .sections {
    margin-bottom: 7px;
  }
  
  a {
    font-weight: bold;
    text-decoration: none;
    color: #2c3e50;
    &.router-link-exact-active {
      // color: #42b983;
      color: #0070C0;
    }
  }
}

button {
    margin-right: 10px;
    margin-bottom: 5px;
    padding: 5px;
    width: 100px;

    background-color: #F7F7F7;
    border: 0.1em solid #0070C0;
    color: #0070C0;
    border-radius: 4px;
    font-weight: 600;
  }

  button:hover, .bttn-selected {
    color: #42B983;
    border-color: #42B983;
  }

  .bttn-remove {
    color: #c00 !important;
    border-color: #c00 !important;
  }

  .list {
    max-height: 500px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 30px;
    background-color: #f5f5f5;
    border-radius: 6px;
  }
</style>
