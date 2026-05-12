// 7 questions with deconstructive tech-jargon dimension labels
// Dimensions: D0=CrashHandler, D1=CoreConflict, D2=UpdateVector, D3=BackgroundDaemon

const questions = [
  {
    id: 0,
    dimLabel: 'CRASH_HANDLER.dll',
    dimDesc: '当系统遭遇未捕获异常时，调用栈顶部的第一响应函数。此项检测您的默认异常处理策略。注：Ctrl+Z 不在可用选项内。',
    text: '遇到Bug时，你的第一反应是？',
    options: [
      { label: '先放着，明天再说', value: 0, dim: 0 },
      { label: '假装没发生过', value: 0, dim: 0 },
      { label: '立刻处理，不解决不睡', value: 1, dim: 0 }
    ]
  },
  {
    id: 1,
    dimLabel: 'CRASH_HANDLER.dll',
    dimDesc: '补充扫描：当异常来源为其他进程（人类）时，处理策略是否保持一致？此项用于校验核心 dump 文件的一致性。',
    text: '有人踩了你的底线，你通常会？',
    options: [
      { label: '沉默，但记在心里', value: 0, dim: 0 },
      { label: '直接说出来', value: 1, dim: 0 }
    ]
  },
  {
    id: 2,
    dimLabel: 'KERNEL_CONFLICT.sys',
    dimDesc: '扫描系统内核中的长期驻留冲突。此冲突通常不被任务管理器显示，但持续占用约 34% 的 CPU 时间。建议不要尝试强行终止——它是系统设计的一部分。',
    text: '你最大的系统冲突是什么？',
    options: [
      { label: '想太多，做太少', value: 0, dim: 1 },
      { label: '总觉得格格不入', value: 0, dim: 1 },
      { label: '缺乏勇气去争取', value: 1, dim: 1 }
    ]
  },
  {
    id: 3,
    dimLabel: 'KERNEL_CONFLICT.sys',
    dimDesc: '补充扫描：在多线程（社交）环境下，冲突进程的内存占用是否显著升高？此项检测您的线程同步开销。',
    text: '在人群中，你更常感到？',
    options: [
      { label: '消耗，需要独处充电', value: 0, dim: 1 },
      { label: '被误解，话到嘴边咽回去', value: 1, dim: 1 }
    ]
  },
  {
    id: 4,
    dimLabel: 'UPDATE_MANAGER.exe',
    dimDesc: '检测系统自我更新偏好。注意：本扫描仅识别更新方向，不负责判断更新是否成功。部分用户报告更新后反而出现更多 Bug——这是正常的。',
    text: '如果可以更新自己，你选择？',
    options: [
      { label: '停止内耗，流畅运行', value: 0, dim: 2 },
      { label: '扩大舒适区，装更多可能', value: 0, dim: 2 },
      { label: '换一套人设重新开始', value: 1, dim: 2 }
    ]
  },
  {
    id: 5,
    dimLabel: 'BACKGROUND_DAEMON.service',
    dimDesc: '扫描系统空闲时（睡眠前）自动启动的后台进程。此进程在大多数用户中无法手动关闭，已知运行时长中位数为 1.7 小时。',
    text: '睡前你的大脑在跑什么进程？',
    options: [
      { label: '今天的尴尬回放', value: 0, dim: 3 },
      { label: '明天的计划预演', value: 1, dim: 3 }
    ]
  },
  {
    id: 6,
    dimLabel: 'BACKGROUND_DAEMON.service',
    dimDesc: '补充扫描：检测长期记忆存储的文件系统完整性。警告：部分用户报告记忆存在静默写入——即在不知情的情况下被修改。这不是 Bug，是特性。',
    text: '你觉得自己的记忆更接近？',
    options: [
      { label: '事实档案，精确但冰冷', value: 0, dim: 3 },
      { label: '被改写过的故事，模糊但温暖', value: 1, dim: 3 }
    ]
  }
]

module.exports = questions
