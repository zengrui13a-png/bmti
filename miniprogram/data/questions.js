// miniprogram/data/questions.js
// 7 questions, each option carries a dimension value (0 or 1)
// Dimensions: D0=Bug处理, D1=核心冲突, D2=更新方向, D3=后台进程

const questions = [
  {
    id: 0,
    text: '遇到Bug时，你的第一反应是？',
    options: [
      { label: '先放着，明天再说', value: 0, dim: 0 },
      { label: '假装没发生过', value: 0, dim: 0 },
      { label: '立刻处理，不解决不睡', value: 1, dim: 0 }
    ]
  },
  {
    id: 1,
    text: '有人踩了你的底线，你通常会？',
    options: [
      { label: '沉默，但记在心里', value: 0, dim: 0 },
      { label: '直接说出来', value: 1, dim: 0 }
    ]
  },
  {
    id: 2,
    text: '你最大的系统冲突是什么？',
    options: [
      { label: '想太多，做太少', value: 0, dim: 1 },
      { label: '总觉得格格不入', value: 0, dim: 1 },
      { label: '缺乏勇气去争取', value: 1, dim: 1 }
    ]
  },
  {
    id: 3,
    text: '在人群中，你更常感到？',
    options: [
      { label: '消耗，需要独处充电', value: 0, dim: 1 },
      { label: '被误解，话到嘴边咽回去', value: 1, dim: 1 }
    ]
  },
  {
    id: 4,
    text: '如果可以更新自己，你选择？',
    options: [
      { label: '停止内耗，流畅运行', value: 0, dim: 2 },
      { label: '扩大舒适区，装更多可能', value: 0, dim: 2 },
      { label: '换一套人设重新开始', value: 1, dim: 2 }
    ]
  },
  {
    id: 5,
    text: '睡前你的大脑在跑什么进程？',
    options: [
      { label: '今天的尴尬回放', value: 0, dim: 3 },
      { label: '明天的计划预演', value: 1, dim: 3 }
    ]
  },
  {
    id: 6,
    text: '你觉得自己的记忆更接近？',
    options: [
      { label: '事实档案，精确但冰冷', value: 0, dim: 3 },
      { label: '被改写过的故事，模糊但温暖', value: 1, dim: 3 }
    ]
  }
]

module.exports = questions
