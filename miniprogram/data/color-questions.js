const colorQuestions = [
  {
    id: 0,
    text: '你的燃料来自哪里？',
    channel: 'R',
    options: [
      { label: '暗火 — 内生、持久、愤怒驱动', r: 120, g: 0, b: 0, t: 0 },
      { label: '晨焰 — 外放、明亮、期待驱动', r: 235, g: 0, b: 0, t: 0 }
    ]
  },
  {
    id: 1,
    text: '你如何生长？',
    channel: 'G',
    options: [
      { label: '苔 — 安静、反刍、独处消化', r: 0, g: 80, b: 0, t: 0 },
      { label: '藤 — 碰撞、对话、外部成形', r: 0, g: 195, b: 0, t: 0 }
    ]
  },
  {
    id: 2,
    text: '你的边界在哪里？',
    channel: 'B',
    options: [
      { label: '冰 — 清晰、不容商酌', r: 0, g: 0, b: 195, t: 0 },
      { label: '雾 — 流动、取决于对方', r: 0, g: 0, b: 110, t: 0 }
    ]
  },
  {
    id: 3,
    text: '你被看穿的程度？',
    channel: 'T',
    options: [
      { label: '毛玻璃 — 隐藏、需要耐心才能看清', r: 0, g: 0, b: 0, t: 0.20 },
      { label: '清水 — 透明、藏不住', r: 0, g: 0, b: 0, t: 0.80 }
    ]
  }
]

module.exports = colorQuestions
