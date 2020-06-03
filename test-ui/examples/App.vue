<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div>
      <g-button>默认按钮</g-button>
      <g-button icon="settings">icon按钮</g-button>
      <g-button :loading="true">loading按钮</g-button>
      <g-button disabled>disabled按钮</g-button>
    </div>
    <div>
      <g-input></g-input>
      <g-input value="中文"></g-input>
      <g-input value="中文" disabled></g-input>
      <g-input value="中文" readonly></g-input>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
