const results = require('../../data/results')
const { calcRGBTI } = require('../../utils/calculator')
const app = getApp()

function formatTime(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const h = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const s = String(date.getSeconds()).padStart(2, '0')
  return `${y}-${m}-${d} ${h}:${min}:${s}`
}

function genBgColor(rgbti) {
  return 'rgba(' + rgbti.R + ',' + rgbti.G + ',' + rgbti.B + ',' + rgbti.T.toFixed(2) + ')'
}

Page({
  data: {
    result: null,
    rgbti: null,
    shareText: '',
    currentTime: '',
    bgColor: '',
    colorMode: false
  },

  onLoad() {
    var typeIndex = app.globalData.typeIndex
    if (typeIndex < 0 || typeIndex >= results.length) {
      wx.redirectTo({ url: '/pages/index/index' })
      return
    }
    var result = results[typeIndex]
    var rgbti = calcRGBTI(typeIndex, results)
    this.setData({
      result: result,
      rgbti: rgbti,
      shareText: '我的出厂设置是「' + result.name + '」\n颜色: rgba(' + rgbti.R + ',' + rgbti.G + ',' + rgbti.B + ',' + rgbti.T.toFixed(2) + ')\n\n' + result.diagnosis + '\n\n测测你的Bug →',
      currentTime: formatTime(new Date()),
      bgColor: '',
      colorMode: false
    })
  },

  onToggleColorMode() {
    var colorMode = !this.data.colorMode
    this.setData({
      colorMode: colorMode,
      bgColor: colorMode ? genBgColor(this.data.rgbti) : ''
    })
  },

  onRetake() {
    app.globalData.answers = []
    app.globalData.typeIndex = -1
    wx.redirectTo({ url: '/pages/index/index' })
  },

  onShareAppMessage() {
    if (!this.data.result) {
      return { title: '测测你的Bug人格', path: '/pages/index/index' }
    }
    return {
      title: '我的出厂设置是「' + this.data.result.name + '」。测测你的Bug是什么？',
      path: '/pages/index/index',
      imageUrl: ''
    }
  }
})
