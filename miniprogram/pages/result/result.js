const results = require('../../data/results')
const app = getApp()

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
      shareText: `我的出厂设置是「${result.name}」\n\n${result.diagnosis}\n\n测测你的Bug →`
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
