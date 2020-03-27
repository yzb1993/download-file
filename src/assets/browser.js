/*
 * @Author: Alias You
 * @Date: 2019-12-31 11:36:49
 * @LastEditors: Alias You
 * @LastEditTime: 2020-03-27 14:44:27
 * @Description: File description
 * @FilePath: /download/src/assets/browser.js
 */
// 浏览器信息相关

// 判断访问终端
var browser = {
  versions: (function () {
    var u = navigator.userAgent && navigator.userAgent.toLowerCase()
    return {
      trident: u.indexOf('trident') > -1, // IE内核
      presto: u.indexOf('presto') > -1, // opera内核
      webKit: u.indexOf('applewebkit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('gecko') > -1 && u.indexOf('khtml') === -1, // 火狐内核
      mobile: !!u.match(/applewebkit.*mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/), // ios终端
      android: u.indexOf('android') > -1 || u.indexOf('adr') > -1, // android终端
      iPhone: u.indexOf('iphone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('ipad') > -1, // 是否iPad
      webApp: u.indexOf('safari') === -1, // 是否web应该程序，没有头部与底部
      weixin: u.indexOf('micromessenger') > -1, // 是否微信 （2015-01-22新增）
      qq: u.match(/\sqq/i) === ' qq', // 是否QQ
      tencent: !!u.match(/qqbrowse/), // qq浏览器
      mqq: u.match(/mqqbrowser/i), // 移动端QQ浏览器
      chrome: !!(u.indexOf('chrome') && window.chrome), // 谷歌浏览器
      chromeIOS: !!u.match(/CriOS\/[\d]+/i), // ios移动端 chrome
      safari: u.indexOf('safari') !== -1 && u.indexOf('chrome') === -1, // Safari浏览器
      ie: u.match(/Edge|MSIE|Trident/i), // ie 浏览器
      firefox: u.indexOf('firefox') !== -1, // 火狐浏览器
      weibo: u.match(/WeiBo/i) === 'weibo', // 微博浏览器
      uc: u.indexOf('ucbrowser') !== -1 // 是否是uc浏览器
    }
  })(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

export default browser
