
<template>
  <div id="app" >
    <el-scrollbar  view-class="view-box" :native="true"  >
      <router-view/>
    </el-scrollbar>
  </div>
</template>
<script>

  import NavMenu from './components/common/NavMenu'
  export default {
      name: 'App',
      components: {NavMenu}
  }
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
