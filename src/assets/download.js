/*
 * @Author: Alias You
 * @Date: 2020-03-11 19:33:17
 * @LastEditors: Alias You
 * @LastEditTime: 2020-03-27 17:08:06
 * @Description: 下载文件功能
 * @FilePath: /download/src/assets/download.js
 */
import browser from './browser.js'
import axios from 'axios'
/**
 * 获取文件名
 * @param {*} url 下载地址
 */
export function getFileName (url, prefix) {
  return (prefix || '') + url.replace(/(.*\/)*([^.]+)/i, '$2')
}
/**
 *  获取文件后缀
 * @param {*} url 下载地址
 */
export function getFileType (url) {
  return url.replace(/.+\./, '')
}

/**
 * 文件链接转文件流下载--主要针对pdf （ios chrome 只能下载一个文件，其他均可下载多个文件）
 * @param url  文件链接
 * @param prefix  文件名前缀
 */
export function download (url, prefix) {
  const isUC = browser.versions.uc
  const isAndroid = browser.versions.android
  const isChromeIOS = browser.versions.chromeIOS

  if (isAndroid || isUC || isChromeIOS) {
    openDownloadDialog(url, prefix)
  } else {
    let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~/])+$/
    if (!reg.test(url)) {
      throw new Error('Incoming parameter is illegal.')
    } else {
      const type = getFileType(url)
      const fileName = getFileName(url, prefix)
      let xhr = new XMLHttpRequest()
      xhr.open('get', url, true)
      axios({
        method: 'GET',
        url: url,
        responseType: 'blob',
        headers: {
          'Content-Type': `application/${type}`
        }
      })
        .then((response) => {
          const data = response.data
          // 接受二进制文件流
          downloadExportFile(data, fileName)
        })
    }
  }
}

/**
 * 数据流文件下载导出文件
 * @param blob  ：返回数据的blob对象或链接
 * @param fileName  ：下载后文件名标记
 */
function downloadExportFile (blob, fileName) {
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    // for IE
    window.navigator.msSaveOrOpenBlob(blob, fileName)
  } else {
    const isIOS = browser.versions.ios
    const isSafari = browser.versions.safari
    const isChromeIOS = browser.versions.chromeIOS

    if (isChromeIOS || (isSafari && isIOS)) {
      let popup = window.open('', '_blank')

      if (popup) {
        popup.document.title = popup.document.body.innerText = 'downloading...'
      }
      var reader = new FileReader()

      reader.onloadend = function () {
        var url = reader.result
        if (popup) {
          popup.location.href = url
        } else {
          window.location = url
        }
        popup = null
      }
      reader.readAsDataURL(blob)
    } else {
      const URL = window.URL || window.webkitURL // URL兼容
      let href = blob
      const downloadElement = document.createElement('a')
      if (typeof blob == 'string') {
        downloadElement.target = '_blank'
        downloadElement.rel = 'nofollow noopener noreferrer'
      } else {
        href = URL.createObjectURL(blob) // 创建下载的链接
      }
      downloadElement.href = href
      downloadElement.download = fileName // 下载后文件名
      document.body.appendChild(downloadElement)
      downloadElement.click() // 点击下载
      document.body.removeChild(downloadElement) // 下载完成移除元素
      if (typeof blob != 'string') {
        URL.revokeObjectURL(href) // 释放掉blob对象
      }
    }
  }
}
/**
 * 跨域文件打开新窗口，单个文件直接下载
 * @param {*} url 下载地址
 */
function openDownloadDialog (url, prefix) {
  var fileName = getFileName(url, prefix)
  alert(fileName)
  var a = document.createElement('a') // 创建标签
  var evt = document.createEvent('HTMLEvents') // 创建事件
  evt.initEvent('click', false, false) // 初始化事件，绑定点击事件，不冒泡，不阻止浏览器默认行为
  a.download = fileName
  a.href = url
  a.target = '_blank'
  a.rel = 'nofollow noopener noreferrer'
  a.dispatchEvent(evt) // 触发事件
  a.click()
}
