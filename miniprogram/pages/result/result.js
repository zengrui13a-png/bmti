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

function genBgStyle(rgbti) {
  var R = rgbti.R, G = rgbti.G, B = rgbti.B, T = rgbti.T
  return 'radial-gradient(ellipse 60% 50% at 40% 35%, rgba(' + R + ',' + G + ',' + B + ',' + T.toFixed(2) + ') 0%, transparent 70%), radial-gradient(ellipse 80% 60% at 50% 50%, rgba(' + R + ',' + G + ',' + B + ',' + (T * 0.4).toFixed(2) + ') 0%, transparent 60%), conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.06) 0deg, transparent 3deg, rgba(255,255,255,0.06) 6deg, transparent 9deg, rgba(255,255,255,0.06) 12deg, transparent 15deg, rgba(255,255,255,0.06) 18deg, transparent 21deg, rgba(255,255,255,0.06) 24deg, transparent 27deg, rgba(255,255,255,0.06) 30deg, transparent 33deg, rgba(255,255,255,0.06) 36deg, transparent 39deg, rgba(255,255,255,0.06) 42deg, transparent 45deg, rgba(255,255,255,0.06) 48deg, transparent 51deg, rgba(255,255,255,0.06) 54deg, transparent 57deg, rgba(255,255,255,0.06) 60deg, transparent 63deg, rgba(255,255,255,0.06) 66deg, transparent 69deg, rgba(255,255,255,0.06) 72deg, transparent 75deg, rgba(255,255,255,0.06) 78deg, transparent 81deg, rgba(255,255,255,0.06) 84deg, transparent 87deg, rgba(255,255,255,0.06) 90deg, transparent 93deg, rgba(255,255,255,0.06) 96deg, transparent 99deg)'
}

Page({
  data: {
    result: null,
    rgbti: null,
    shareText: '',
    currentTime: '',
    bgStyle: '',
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
      bgStyle: '',
      colorMode: false
    })
  },

  onToggleColorMode() {
    var colorMode = !this.data.colorMode
    this.setData({
      colorMode: colorMode,
      bgStyle: colorMode ? genBgStyle(this.data.rgbti) : ''
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
