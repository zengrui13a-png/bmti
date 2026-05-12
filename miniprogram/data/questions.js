// BMTI Diagnostic Modules — system-jargon headers, human-readable options
const questions = [
  {
    id: 0,
    module: 'CRASH_HANDLER.sys',
    tagline: '异常处理策略扫描',
    desc: '当系统捕获到未处理的异常时，调用栈顶部的第一响应函数是什么？此项扫描您的默认崩溃响应模式。',
    text: '遇到问题时，你的第一反应是？',
    options: [
      { label: '延迟回收', hint: '先放着，之后再说', value: 0, dim: 0 },
      { label: '静默丢弃', hint: '假装这件事没发生过', value: 0, dim: 0 },
      { label: '立即断点', hint: '不解决就睡不着觉', value: 1, dim: 0 },
      { label: '广播异常', hint: '告诉身边所有人这件事', value: 1, dim: 0 }
    ]
  },
  {
    id: 1,
    module: 'CRASH_HANDLER.sys',
    tagline: '跨进程异常校验',
    desc: '当异常源来自其他人时，你的处理策略是否保持一致？此项扫描检测你在社交边界上的崩溃传播模式。',
    text: '有人触犯了你，你的处理方式是？',
    options: [
      { label: '写入日志', hint: '记住但不表现出来', value: 0, dim: 0 },
      { label: '收窄权限', hint: '默默拉开距离', value: 0, dim: 0 },
      { label: '发送终止包', hint: '当面说清楚', value: 1, dim: 0 },
      { label: '广播信号', hint: '让周围人都知道', value: 1, dim: 0 }
    ]
  },
  {
    id: 2,
    module: 'KERNEL_CONFLICT.sys',
    tagline: '核心态冲突检测',
    desc: '扫描位于系统最深层的长期驻留冲突。它不被任务管理器显示，却长期占用你的CPU时间。',
    text: '你最大的内在矛盾是什么？',
    options: [
      { label: '缓存溢出', hint: '想太多，做太少——担心的事超过了处理能力', value: 0, dim: 1 },
      { label: '接口不兼容', hint: '总觉得自己跟周围环境对不上', value: 0, dim: 1 },
      { label: '权限不足', hint: '不够自信，不敢去争取', value: 1, dim: 1 },
      { label: '死锁检测', hint: '同时想做两件相反的事，卡住了', value: 1, dim: 1 }
    ]
  },
  {
    id: 3,
    module: 'KERNEL_CONFLICT.sys',
    tagline: '多线程压力测试',
    desc: '在多人在场的环境中，你的冲突进程是否显著升高？此项检测你的社交调度算法复杂度。',
    text: '在人群中，你更常感到？',
    options: [
      { label: 'CPU降频', hint: '消耗很大，结束后需要独处充电', value: 0, dim: 1 },
      { label: '缓存未命中', hint: '你说的话别人总 get 不到', value: 1, dim: 1 },
      { label: '中断屏蔽', hint: '在人群中反而听不到自己想说什么', value: 1, dim: 1 },
      { label: '栈溢出', hint: '想太多导致当场宕机', value: 0, dim: 1 }
    ]
  },
  {
    id: 4,
    module: 'UPDATE_MANAGER.exe',
    tagline: '自我更新向量检测',
    desc: '检测你在发现自身版本需要更新时倾向采取的策略。注意：某些更新包可能引入新的 Bug。',
    text: '如果给自己做一次更新，你选择？',
    options: [
      { label: '优化性能', hint: '停掉内部消耗，让运行更流畅', value: 0, dim: 2 },
      { label: '扩展寻址', hint: '扩大能力边界，装下更多可能', value: 0, dim: 2 },
      { label: '主题切换', hint: '换一种风格示人，给外界新的印象', value: 1, dim: 2 },
      { label: '全新安装', hint: '换个城市或身份，彻底重来', value: 1, dim: 2 }
    ]
  },
  {
    id: 5,
    module: 'BACKGROUND_DAEMON.service',
    tagline: '空闲态后台进程扫描',
    desc: '扫描系统进入空闲状态前自动启动的进程。此服务被设置为自启动，大多数用户无法手动停止。',
    text: '睡前你的大脑在不由自主地想什么？',
    options: [
      { label: '日志回放', hint: '反复回想今天说错的话、做错的事', value: 0, dim: 3 },
      { label: '快照回溯', hint: '反复复盘过去的某个场景', value: 0, dim: 3 },
      { label: '预编译执行', hint: '提前演练明天要做的事', value: 1, dim: 3 },
      { label: '模拟运行', hint: '脑补接下来所有可能发生的情况', value: 1, dim: 3 }
    ]
  },
  {
    id: 6,
    module: 'BACKGROUND_DAEMON.service',
    tagline: '长期存储完整性校验',
    desc: '检测长期记忆是否被悄悄修改。部分用户报告记忆存在静默重写——回忆时发现故事和事实不一样了。',
    text: '你觉得自己的记忆更像什么？',
    options: [
      { label: '只读挂载', hint: '就是一份精确的事实档案', value: 0, dim: 3 },
      { label: '预写日志', hint: '每次回忆都追溯到原事件', value: 0, dim: 3 },
      { label: '写时复制', hint: '每次回忆都会悄悄修改原来的版本', value: 1, dim: 3 },
      { label: '索引重建', hint: '不断把记忆重新组织成更好理解的故事', value: 1, dim: 3 }
    ]
  }
]

module.exports = questions
