<!--
 * @Author: Alias You
 * @Date: 2020-03-27 10:40:13
 * @LastEditors: Alias You
 * @LastEditTime: 2020-03-27 17:30:37
 * @Description: 文件下载 demo
 * @FilePath: /download-file/src/components/HelloWorld.vue
 -->
<template>
  <div class="hello">
    <a @click="onClickDownloadReceipt">点击下载</a>
  </div>
</template>

<script>
import {download} from '@/assets/download.js'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      list: [
        window.location.origin + '/file/1.jpg',
        window.location.origin + '/file/2.jpg'
      ]
    }
  },
  methods: {
    // 点击下载多个发票
    onClickDownloadReceipt () {
      const list = this.list
      if (list instanceof Array && list.length > 0) {
        this.downloadPDF(0, list)
      }
    },
    // 递归下载
    downloadPDF (i, list) {
      let len = list.length
      download(list[i], 'Download_')
      setTimeout(() => {
        i++
        if (i < len) {
          this.downloadPDF(i, list)
        }
      }, 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
