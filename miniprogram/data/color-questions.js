// RGBTI Display Calibration — system/graphics terminology
const colorQuestions = [
  {
    id: 0,
    channel: 'R',
    channelName: 'RED_CHANNEL',
    tagline: '显示器色温配置文件',
    text: '你的情绪处理器默认加载的色温预设是？',
    options: [
      { label: '6500K 冷色温', desc: '偏冷调，理性优先，情绪渲染开销低', r: 80 },
      { label: '5500K 标准', desc: '均衡色温，真实还原，不压低也不夸大', r: 145 },
      { label: '4500K 暖色温', desc: '偏暖调，感性驱动，色彩饱和度偏高', r: 205 },
      { label: '自定色温曲线', desc: '不套用预设，色彩由当前运行状态动态调节', r: 248 }
    ]
  },
  {
    id: 1,
    channel: 'G',
    channelName: 'GREEN_CHANNEL',
    tagline: 'GPU 渲染精度设置',
    text: '你的大脑 GPU 默认的渲染质量等级是？',
    options: [
      { label: '低多边形渲染', desc: '看轮廓就够，不纠结纹理细节，省算力', g: 60 },
      { label: '平衡渲染', desc: '适可而止，关键帧高精度，其余自动降级', g: 140 },
      { label: '高清纹理映射', desc: '追求细腻度，每一帧都想看清，显存占用偏高', g: 195 },
      { label: '实时光线追踪', desc: '每条光线的路径都算一遍，极致画质但功耗大', g: 235 }
    ]
  },
  {
    id: 2,
    channel: 'B',
    channelName: 'BLUE_CHANNEL',
    tagline: '屏幕边缘溢出处理',
    text: '你与外界的边界采用的裁剪模式是？',
    options: [
      { label: '硬裁剪 (Hard Clip)', desc: '像素不可逾越边界，画面干净利落', b: 210 },
      { label: '柔化边缘 (Soft Edge)', desc: '边界做轻微高斯模糊，有过渡但不消失', b: 165 },
      { label: '羽化扩散 (Feather)', desc: '边缘向外渐变衰减，形状随接触对象变化', b: 115 },
      { label: '无边模式 (Borderless)', desc: '窗口无边框，内容直接融入桌面环境', b: 72 }
    ]
  },
  {
    id: 3,
    channel: 'T',
    channelName: 'ALPHA_MASK',
    tagline: '窗口图层透明度',
    text: '你的桌面窗口默认不透明度设置为？',
    options: [
      { label: '100% 不透明', desc: '所有窗口完全遮挡，没人能穿透你的界面', t: 0.18 },
      { label: '90% 轻微透明', desc: '偶尔透出背景层，但轮廓始终清晰', t: 0.40 },
      { label: '60% 半透明', desc: '大部分内容可见，保留一层柔光保护膜', t: 0.65 },
      { label: '20% 高度透明', desc: '实时显示底层状态，任何进程都能读取你的窗口', t: 0.92 }
    ]
  }
]

module.exports = colorQuestions
