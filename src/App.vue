<!--
 * @Author: Alias You
 * @Date: 2020-03-27 10:40:13
 * @LastEditors: Alias You
 * @LastEditTime: 2020-04-14 20:04:25
 * @Description: File description
 * @FilePath: /download-file/src/App.vue
 -->
<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <ABTest />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ABTest from './components/ABTest.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    ABTest
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
