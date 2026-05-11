const questions = require('../../data/questions')
const { calculateType } = require('../../utils/calculator')
const app = getApp()

Page({
  data: {
    currentIndex: 0,
    totalQuestions: questions.length,
    question: null,
    progress: 0,
    answers: [],
    selecting: false
  },

  onLoad() {
    this.setData({
      totalQuestions: questions.length,
      question: questions[0],
      progress: 0
    })
  },

  onShow() {
    this.data.selecting = false
  },

  onSelectOption(e) {
    if (this.data.selecting) return
    if (!this.data.question) return
    this.data.selecting = true

    const optionIndex = e.currentTarget.dataset.index
    const selectedOption = this.data.question.options[optionIndex]
    const answers = [...this.data.answers, selectedOption]
    const nextIndex = this.data.currentIndex + 1

    if (nextIndex >= questions.length) {
      app.globalData.answers = answers
      app.globalData.typeIndex = calculateType(answers)
      wx.redirectTo({ url: '/pages/result/result' })
    } else {
      this.setData({
        currentIndex: nextIndex,
        question: questions[nextIndex],
        progress: Math.round((nextIndex / questions.length) * 100),
        answers
      })
      this.data.selecting = false
    }
  }
})
