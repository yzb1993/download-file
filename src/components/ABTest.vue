<!--
 * @Author: Alias You
 * @Date: 2020-04-14 20:03:20
 * @LastEditors: Alias You
 * @LastEditTime: 2020-04-14 20:59:51
 * @Description: File description
 * @FilePath: /download-file/src/components/ABTest.vue
 -->
<template>
  <div>Start AB Test</div>
</template>



<script>
import md5 from 'blueimp-md5'
console.log(md5('adadas' + 'ab_test'))
export default {
  mounted() {
    const data = {}
    for(var i=0; i< 1000; i++) {
      const md5 = this.getMD5(i + '') // md5
      const num = parseInt(md5, 16)
      console.log(md5)
      console.log(num.toString(10))
      const mode = Math.floor(num)
      // console.log(mode)
      data[mode] = data[mode] ? data[mode]++ : 1
    }
    // console.log(data)
  },
  methods: {
    getMD5(deviceId) {
      return md5(deviceId + 'ab_test', '')
    }
  }
}
</script>