// BMTI Diagnostic Modules — CS-jargon deconstruction
// Scoring: dim 0=Bug处理, 1=核心冲突, 2=更新方向, 3=后台进程
// Each question has 4 options: A/B → value=0, C/D → value=1 (richer labels, same binary scoring)

const questions = [
  {
    id: 0,
    module: 'CRASH_HANDLER.sys',
    tagline: '异常处理策略扫描 · 用户态回调函数检测',
    desc: '拦截未捕获异常时，您的调用栈顶部驻留了哪个处理函数？此项检测将扫描 SEH 链并输出您的默认崩溃响应模式。注意：/forcequit 参数已被弃用。',
    options: [
      { label: '延迟回收：标记为"稍后处理"并返回 S_OK', value: 0, dim: 0 },
      { label: '静默丢弃：捕获后直接吞掉异常，不生成 dump 文件', value: 0, dim: 0 },
      { label: '立即断点：触发 INT3 并进入内核调试模式', value: 1, dim: 0 },
      { label: '广播异常：向所有线程发送 EXCEPTION_CONTINUE_SEARCH', value: 1, dim: 0 }
    ]
  },
  {
    id: 1,
    module: 'CRASH_HANDLER.sys',
    tagline: '跨进程异常校验 · IPC 边界防御检测',
    desc: '当异常源为外部进程（人类实体）时，您的处理策略是否保持签名一致？此扫描用于检测 IPC 边界上的崩溃传播因子。相关 CVE：CVE-1998-MBTI-OVERFLOW。',
    options: [
      { label: '写入日志但不报警：记录到内部环形缓冲区', value: 0, dim: 0 },
      { label: 'PID 隔离：收窄对方进程的访问令牌', value: 0, dim: 0 },
      { label: '主动发送 RST 包：立即终止 TCP 连接', value: 1, dim: 0 },
      { label: '广播网络：向所有节点发送 TERM 信号', value: 1, dim: 0 }
    ]
  },
  {
    id: 2,
    module: 'KERNEL_CONFLICT.sys',
    tagline: '核心态冲突检测 · Ring 0 驻留扫描',
    desc: '扫描位于内核地址空间的长期驻留冲突。此冲突被标记为 NON_PAGED，无法被任务管理器枚举。已知占用约 34% 的 IRQL 时间。不建议尝试 KeBugCheck——这是系统设计的组成部分。',
    options: [
      { label: '预取缓存溢出：已加载的担忧超过物理页帧', value: 0, dim: 1 },
      { label: 'ABI 不兼容：二进制接口与宿主环境未对齐', value: 0, dim: 1 },
      { label: '访问权限不足：令牌缺少 SE_DEBUG_PRIVILEGE', value: 1, dim: 1 },
      { label: '死锁检测触发：两个以上线程争夺同一互斥体', value: 1, dim: 1 }
    ]
  },
  {
    id: 3,
    module: 'KERNEL_CONFLICT.sys',
    tagline: '多线程环境压力测试 · 上下文切换开销分析',
    desc: '在进程亲和性被强制设为全核的情况下，测量每次线程上下文切换的 TLB 刷新开销。此项检测用于评估您的社会调度算法是否为 O(n²) 复杂度。',
    options: [
      { label: 'CPU 降频：每轮社交后自动进入 C3 睡眠状态', value: 0, dim: 1 },
      { label: 'L1 缓存未命中：意图数据无法在共享缓存中被找到', value: 1, dim: 1 },
      { label: 'IRQL 过高：外部中断被屏蔽，无法响应社交信号', value: 1, dim: 1 },
      { label: '堆栈溢出：递归自省导致调用栈超出已分配内存', value: 0, dim: 1 }
    ]
  },
  {
    id: 4,
    module: 'UPDATE_MANAGER.exe',
    tagline: '自我更新向量检测 · 热补丁 vs 冷重启分析',
    desc: '检测系统在检测到自身版本过旧时采用的更新策略。注意：Windows Update 的历史记录显示，部分补丁安装后反而增加了 Bug 数量。这是预期的——更新本身就是一种破坏性操作。',
    options: [
      { label: '性能优化：禁用无用服务并整理注册表碎片', value: 0, dim: 2 },
      { label: '扩展地址空间：从 32-bit 升级到 64-bit 寻址', value: 0, dim: 2 },
      { label: '主题包替换：无痛切换，桌面图标和注册名同步更新', value: 1, dim: 2 },
      { label: '全新安装：格式化 C 盘并重新部署所有组件', value: 1, dim: 2 }
    ]
  },
  {
    id: 5,
    module: 'BACKGROUND_DAEMON.service',
    tagline: '空闲态后台进程扫描 · 睡眠前自动启动项检测',
    desc: '扫描系统进入 IDLE 状态前自动拉起的所有后台进程。此服务被标记为 AUTO_START，大多数用户报告无法通过 services.msc 手动停止。已知中位运行时长：1.7 小时。',
    options: [
      { label: '日志重放：从当日事件查看器中提取错误项并循环播放', value: 0, dim: 3 },
      { label: '快照回溯：反复挂载过去的卷影副本并执行 diff 比较', value: 0, dim: 3 },
      { label: '预编译执行：在运行时之前将未来计划 JIT 编译为本地代码', value: 1, dim: 3 },
      { label: '模拟运行：在沙箱中预执行明天的所有可能指令路径', value: 1, dim: 3 }
    ]
  },
  {
    id: 6,
    module: 'BACKGROUND_DAEMON.service',
    tagline: '长期存储完整性校验 · NTFS 日志回滚检测',
    desc: '扫描长期记忆卷的 NTFS 日志，检测是否存在静默写入——即数据在未被用户感知的情况下被修改。注意：部分用户报告 USN 日志显示元数据被修改但内容未变。这被称为 NTFS_GHOST_WRITE，目前无修复计划。',
    options: [
      { label: '只读挂载：记忆卷以只读方式加载，禁止写操作', value: 0, dim: 3 },
      { label: 'WAL 模式：预写日志确保每次读取都追溯原始事务', value: 0, dim: 3 },
      { label: '写时复制：每次回忆触发新的分叉，原数据保留但不访问', value: 1, dim: 3 },
      { label: '索引重建：定期重建 B+ 树以优化叙事查询性能', value: 1, dim: 3 }
    ]
  }
]

module.exports = questions
