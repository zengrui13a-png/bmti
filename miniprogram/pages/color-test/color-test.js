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
    const colorValues = { ...this.data.colorValues }

    if (this.data.question.channel === 'R') {
      colorValues.R = opt.r
    } else if (this.data.question.channel === 'G') {
      colorValues.G = opt.g
    } else if (this.data.question.channel === 'B') {
      colorValues.B = opt.b
    } else if (this.data.question.channel === 'T') {
      colorValues.T = opt.t
    }

    const nextIndex = this.data.currentIndex + 1

    if (nextIndex >= colorQuestions.length) {
      app.globalData.colorValues = colorValues
      wx.redirectTo({ url: '/pages/color-result/color-result' })
    } else {
      this.setData({
        currentIndex: nextIndex,
        question: colorQuestions[nextIndex],
        colorValues,
        selectedIndex: -1
      })
      this.data.selecting = false
    }
  }
})
