const results = require('../../data/results')
const app = getApp()

function genRgba(cv) {
  return 'rgba(' + cv.R + ',' + cv.G + ',' + cv.B + ',' + cv.T.toFixed(2) + ')'
}

Page({
  data: {
    result: null,
    rgba: '',
    bgColor: '',
    note: ''
  },

  onLoad() {
    var typeIndex = app.globalData.typeIndex
    var cv = app.globalData.colorValues

    if (typeIndex < 0 || !cv) {
      wx.redirectTo({ url: '/pages/index/index' })
      return
    }

    var result = results[typeIndex]
    var rgba = genRgba(cv)

    var noteMap = {
      '120,80,195,0.20': '暗火在雾中缓慢燃烧——你的光不急于被看见。',
      '120,80,195,0.80': '通透的冷紫——你的内敛藏不住底色。',
      '120,80,110,0.20': '灰紫迷雾——精致但不对任何人敞开。',
      '120,80,110,0.80': '被改写过的天空——朦胧而诚实。',
      '120,195,195,0.20': '雾中的朱红——你不等任何人看懂。',
      '120,195,195,0.80': '明亮的桃红——你在未来里藏得太浅。',
      '120,195,110,0.20': '效率至上者的底色——暗红中透着克制。',
      '120,195,110,0.80': '被反复编辑过的暖光——你的人生是开放源码。',
      '235,80,195,0.20': '雾蓝深处的燃烧——重启前的短暂光芒。',
      '235,80,195,0.80': '明亮的蓝紫——你在每个窗口之间穿行。',
      '235,80,110,0.20': '美貌之下的暗涌——柔和的暖灰蓝。',
      '235,80,110,0.80': '记忆会呼吸——透亮的淡紫。',
      '235,195,195,0.20': '孔雀绿迷雾——用知识包裹自己。',
      '235,195,195,0.80': '明亮的薄荷——预案比现实更鲜活。',
      '235,195,110,0.20': '你的从容是调试出来的——温和的茶绿。',
      '235,195,110,0.80': '清澈的暖绿——你把自己当成开放源代码。'
    }

    var key = cv.R + ',' + cv.G + ',' + cv.B + ',' + cv.T.toFixed(2)
    var note = noteMap[key] || result.colorNote

    this.setData({
      result: result,
      rgba: rgba,
      bgColor: rgba,
      note: note
    })
  },

  onRetake() {
    app.globalData.answers = []
    app.globalData.typeIndex = -1
    app.globalData.colorValues = null
    wx.redirectTo({ url: '/pages/index/index' })
  },

  onShareAppMessage() {
    if (!this.data.result) {
      return { title: '测测你的Bug人格', path: '/pages/index/index' }
    }
    return {
      title: '我的出厂设置是「' + this.data.result.name + '」 色号 ' + this.data.rgba + '。测测你的Bug是什么？',
      path: '/pages/index/index',
      imageUrl: ''
    }
  }
})
