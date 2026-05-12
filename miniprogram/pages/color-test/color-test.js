const colorQuestions = require('../../data/color-questions')
const app = getApp()

Page({
  data: {
    currentIndex: 0,
    totalQuestions: colorQuestions.length,
    question: null,
    colorValues: { R: 0, G: 0, B: 0, T: 0 },
    selectedIndex: -1,
    selecting: false
  },

  onLoad() {
    this.setData({
      totalQuestions: colorQuestions.length,
      question: colorQuestions[0]
    })
  },

  onShow() {
    this.data.selecting = false
  },

  onSelectOption(e) {
    if (this.data.selecting) return
    this.setData({ selectedIndex: e.currentTarget.dataset.index })
  },

  onNextStep() {
    if (this.data.selecting) return
    if (this.data.selectedIndex < 0) return
    if (!this.data.question) return
    this.data.selecting = true

    const opt = this.data.question.options[this.data.selectedIndex]
    const cv = { ...this.data.colorValues }

    if (opt.r !== undefined) cv.R = opt.r
    if (opt.g !== undefined) cv.G = opt.g
    if (opt.b !== undefined) cv.B = opt.b
    if (opt.t !== undefined) cv.T = opt.t

    const nextIndex = this.data.currentIndex + 1

    if (nextIndex >= colorQuestions.length) {
      app.globalData.colorValues = cv
      wx.redirectTo({ url: '/pages/color-result/color-result' })
    } else {
      this.setData({
        currentIndex: nextIndex,
        question: colorQuestions[nextIndex],
        colorValues: cv,
        selectedIndex: -1
      })
      this.data.selecting = false
    }
  }
})
