/*
 * @Author: Alias You
 * @Date: 2020-03-11 19:33:17
 * @LastEditors: Alias You
 * @LastEditTime: 2020-03-27 23:14:26
 * @Description: 多文件下载功能
 * @FilePath: /download-file/src/assets/download.js
 */
import browser from './browser.js'
import axios from 'axios'

/**
 * 文件链接转文件流下载--主要针对pdf （ios chrome 只能下载一个文件，其他均可下载多个文件）
 * @param url  文件链接
 * @param prefix  文件名前缀
 * @param tips 下载确认弹框提示文案 （chromeIOS 兼容，需要提示）
 */
export function download (url, prefix, tips) {
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
        downloadExportFile(data, fileName, tips)
      })
  }
}
/**
 * 数据流文件下载导出文件
 * @param blob  ：返回数据的blob对象或链接
 * @param fileName  ：下载后文件名标记
 * @param tips 下载确认弹框提示文案 （chromeIOS 兼容，需要提示）
 */
function downloadExportFile (blob, fileName, tips) {
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    // for IE
    window.navigator.msSaveOrOpenBlob(blob, fileName)
  } else {
    const isIOS = browser.versions.ios
    const isSafari = browser.versions.safari
    // ios chrome 及 ios uc 下载兼容提示
    if (isIOS && !isSafari) alert(getDownloadTips(tips, fileName))

    if (isIOS) {
      var reader = new FileReader()

      reader.onloadend = function () {
        var url = reader.result
        url = isSafari ? url.replace(/^data:[^;]*;/, 'data:attachment/file;') : url
        createDownloadLink(url, fileName)
      }
      reader.readAsDataURL(blob)
    } else {
      const URL = window.URL || window.webkitURL // URL兼容
      let url = blob

      if (typeof blob == 'string') {
        createDownloadLink(url, fileName, true)
      } else {
        url = URL.createObjectURL(blob) // 创建下载的链接
        createDownloadLink(url, fileName)
      }
      if (typeof blob != 'string') {
        URL.revokeObjectURL(url) // 释放掉blob对象
      }
    }
  }
}
/**
 * 创建下载 a 标签, 点击触发下载
 * @param {*} url 文件地址
 * @param {*} fileName 文件名
 * @param {*} isBlank 是否新窗口打开
 */
function createDownloadLink (url, fileName, isBlank) {
  const downloadElement = document.createElement('a')
  if (isBlank) {
    downloadElement.target = '_blank'
    downloadElement.rel = 'nofollow noopener noreferrer'
  }
  downloadElement.href = url
  downloadElement.download = fileName // 下载后文件名
  document.body.appendChild(downloadElement)
  downloadElement.click() // 点击下载
  document.body.removeChild(downloadElement) // 下载完成移除元素
}
/**
 * 下载文件弹框提示 （解决 chromeIOS 多文件下载问题）
 * @param {*} text 下载提示文案
 * @param {*} fileName 下载文件名
 */
function getDownloadTips (text, fileName) {
  return text || `Download "${fileName}"?`
}
/**
 * 获取文件名
 * @param {*} url 下载地址
 */
function getFileName (url, prefix) {
  return (prefix || '') + url.replace(/(.*\/)*([^.]+)/i, '$2')
}
/**
 *  获取文件后缀
 * @param {*} url 下载地址
 */
function getFileType (url) {
  return url.replace(/.+\./, '')
}