// RGBTI Spectral Calibration — 4 channels, 4 options each
// Each option carries the full rgba tuple it contributes

const colorQuestions = [
  {
    id: 0,
    channel: 'R',
    channelName: 'RED_CHANNEL.dll',
    tagline: '燃料波长校准 · 光谱红移/蓝移检测',
    text: '你的核心燃料位于电磁波谱的哪个区段？',
    options: [
      { label: '暗火·长波', desc: '内生、持久、不需要被看见', r: 80, t: 0 },
      { label: '余烬·中波', desc: '温热的残留，偶尔复燃', r: 145, t: 0 },
      { label: '明火·短波', desc: '明亮、外放，照亮周围', r: 205, t: 0 },
      { label: '烈焰·超短波', desc: '灼热、不可忽略的存在', r: 248, t: 0 }
    ]
  },
  {
    id: 1,
    channel: 'G',
    channelName: 'GREEN_CHANNEL.dll',
    tagline: '生长模式检测 · 叶绿体光合速率扫描',
    text: '你的生长方式更接近哪种生态策略？',
    options: [
      { label: '苔·底层', desc: '安静蔓延，在无人处覆盖石头', g: 60, t: 0 },
      { label: '藤·攀附', desc: '借助外部结构向上生长', g: 140, t: 0 },
      { label: '灌木·丛生', desc: '密集而灵活，多方向试探', g: 195, t: 0 },
      { label: '乔木·独立', desc: '独自向上，不需要支架', g: 235, t: 0 }
    ]
  },
  {
    id: 2,
    channel: 'B',
    channelName: 'BLUE_CHANNEL.dll',
    tagline: '边界层流分析 · 边界条件雷诺数测度',
    text: '你的边界层流处于哪种流体状态？',
    options: [
      { label: '冰·刚性边界', desc: '明确的 No-Slip Condition，不容商酌', b: 210, t: 0 },
      { label: '霜·半透边界', desc: '大部分封闭，特定波长可通过', b: 165, t: 0 },
      { label: '雾·散射边界', desc: '扩散性的边界层，形状由对方的气压决定', b: 115, t: 0 },
      { label: '汽·蒸发边界', desc: '边界几乎不可见，与周围介质自由交换', b: 72, t: 0 }
    ]
  },
  {
    id: 3,
    channel: 'T',
    channelName: 'ALPHA_MASK.layer',
    tagline: '透明度通道校准 · 材质可见性混合检测',
    text: '你的透明度通道当前设置的混合模式是？',
    options: [
      { label: '毛玻璃', desc: '需要凝视足够久才能辨认形状', t: 0.18, r: 0 },
      { label: '磨砂', desc: '轮廓可见，细节需近距离观察', t: 0.40, r: 0 },
      { label: '半透明', desc: '大部分可见，但保留一层柔光滤镜', t: 0.65, r: 0 },
      { label: '清水', desc: '全透明渲染，实时反映内部状态', t: 0.92, r: 0 }
    ]
  }
]

module.exports = colorQuestions
