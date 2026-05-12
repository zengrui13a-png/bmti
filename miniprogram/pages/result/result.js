const results = require('../../data/results')
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

Page({
  data: {
    result: null,
    shareText: ''
  },

  onLoad() {
    const typeIndex = app.globalData.typeIndex
    if (typeIndex < 0 || typeIndex >= results.length) {
      wx.redirectTo({ url: '/pages/index/index' })
      return
    }
    const result = results[typeIndex]
    this.setData({
      result,
      shareText: `我的出厂设置是「${result.name}」\n\n${result.diagnosis}\n\n测测你的Bug →`,
      currentTime: formatTime(new Date())
    })
  },

  onRetake() {
    app.globalData.answers = []
    app.globalData.typeIndex = -1
    wx.redirectTo({ url: '/pages/index/index' })
  },

  onShareAppMessage() {
    if (!this.data.result) {
      return {
        title: '测测你的Bug人格',
        path: '/pages/index/index'
      }
    }
    return {
      title: `我的出厂设置是「${this.data.result.name}」。测测你的Bug是什么？`,
      path: '/pages/index/index',
      imageUrl: ''
    }
  }
})
