// RGBTI Spectral Calibration — 4 channels, 4 color levels each
const colorQuestions = [
  {
    id: 0,
    channel: 'R',
    channelName: 'RED_CHANNEL.dll',
    tagline: '内在能量源检测',
    text: '最能描述你内心状态的是？',
    options: [
      { label: '暗火', desc: '安静的火焰，持久但不引人注目，在沉默中燃烧', r: 80 },
      { label: '余烬', desc: '表面平静，偶尔复燃，温暖但不至于灼伤自己', r: 145 },
      { label: '明火', desc: '明亮的热情，外向主动，周围的人能感受到你的能量', r: 205 },
      { label: '烈焰', desc: '灼热的存在感，所到之处很难不被注意到', r: 248 }
    ]
  },
  {
    id: 1,
    channel: 'G',
    channelName: 'GREEN_CHANNEL.dll',
    tagline: '成长方式检测',
    text: '你的成长模式更接近？',
    options: [
      { label: '苔', desc: '安静内向，在独处中慢慢积淀，不依赖外界认可', g: 60 },
      { label: '藤', desc: '借助关系和环境向上爬，需要外部支撑但不失自我方向', g: 140 },
      { label: '灌木', desc: '灵活多变，多个方向同时探索，适应力强', g: 195 },
      { label: '乔木', desc: '独立挺拔，靠自己就能长很高，不依附任何支架', g: 235 }
    ]
  },
  {
    id: 2,
    channel: 'B',
    channelName: 'BLUE_CHANNEL.dll',
    tagline: '边界感知检测',
    text: '与你相处时，别人感觉到的边界是？',
    options: [
      { label: '冰', desc: '边界清晰明确，你知道什么可以接受、什么不可以', b: 210 },
      { label: '霜', desc: '大部分时候有边界，但对特定的人会变柔软', b: 165 },
      { label: '雾', desc: '边界随对方而变化，有时候自己也拿不准在哪里', b: 115 },
      { label: '汽', desc: '几乎不设防，跟谁都能快速建立连接', b: 72 }
    ]
  },
  {
    id: 3,
    channel: 'T',
    channelName: 'ALPHA_MASK.layer',
    tagline: '可见度检测',
    text: '别人真正读懂你，需要多长时间？',
    options: [
      { label: '毛玻璃', desc: '很久——你是慢热型，只对极少数人敞开', t: 0.18 },
      { label: '磨砂', desc: '需要耐心——轮廓可见，但细节得靠时间', t: 0.40 },
      { label: '半透明', desc: '不用太久——你愿意分享，但保留一层柔软的滤镜', t: 0.65 },
      { label: '清水', desc: '几乎立刻——你的情绪和想法一目了然，藏不住', t: 0.92 }
    ]
  }
]

module.exports = colorQuestions
