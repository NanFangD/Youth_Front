
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
  console.log('%c ','background-image:url("https://i.loli.net/2020/02/21/Y9cswSXVbOr3GA6.png");background-size:90% 90%;background-repeat:no-repeat;background-position:center center;line-height:60px;padding:30px 200px;');
  console.log(
      "%c警告有人想非法入侵%c\n" +
      "　　 へ　　　　　／|\n" +
      "　　/＼7　　　 ∠＿/\n" +
      "　 /　│　　 ／　／\n" +
      "　│　Z ＿,＜　／　　  /`ヽ\n" +
      "　│　　　　　ヽ　　  /　　〉\n" +
      "　 Y　　　　　`　  /　　/\n" +
      "　ｲ●　 ､　●　　⊂⊃〈　　/\n" +
      "　()　 V　　　　|　＼〈\n" +
      "　　>ｰ ､_　 ィ　 │ ／／\n" +
      "　 / へ　　 /　ﾉ＜| ＼＼\n" +
      "　 ヽ_ﾉ　　(_／　 │／／\n" +
      "　　7　　　　　　　|／\n" +
      "　　＞―r￣￣`ｰ―＿大哥、大姐手下留情\n",'color:#ee231e','color:#E5A706');

  console.log("\n\n\n\n\n\n%c"+
      "                  .-~~~~~~~~~-._       _.-~~~~~~~~~-.\n" +
      "             __.'              ~.   .~              `.__\n" +
      "           .'// 有Bug可以联系我哦 \\./  qq:790624046     \\\\`.\n" +
      "         .'//     非常感谢         |                     \\\\`.\n" +
      "       .'// .-~\"\"\"\"\"\"\"~~~~-._     |     _,-~~~~\"\"\"\"\"\"\"~-. \\\\`.\n" +
      "     .'//.-\"                 `-.  |  .-'                 \"-.\\\\`.\n" +
      "   .'//______.============-..   \\ | /   ..-============.______\\\\`.\n" +
      " .'______________________________\\|/______________________________`.\n",'color:#c88057')
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
