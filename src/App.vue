<template>
  <div id="app">
    <router-view class="main"></router-view>
    <router-link to="/pms/pmsDetails"></router-link>
<!--   <router-link to="/about">About</router-link>
    <img src="./assets/logo.png">

    <router-view/>
-->
  </div>
</template>
<script>
  export default {
    name: 'app'
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "assets/style/index.scss";

  #app {
    height: 100%;
  }

  .main {
    background: #ededed;;
  }
</style>
