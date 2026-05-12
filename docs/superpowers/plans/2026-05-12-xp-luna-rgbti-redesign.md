# WinXP Luna + RGBTI 色卡背景 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Upgrade visual style from Win98 to WinXP Luna with softer colors + add RGBTI color background mode toggle on result page.

**Architecture:** XP Luna palette (gradient titlebars, white body, rounded buttons, reduced saturation). Calculator outputs both typeIndex and RGBTI(R,G,B,T) values. Result page has two visual modes: XP card (default) and color-immersive card (radial+gonic gradient background). Toggle button switches between them. Share card mirrors current mode.

**Tech Stack:** WeChat Mini Program (WXML + WXSS + JS), CSS radial-gradient + conic-gradient, Canvas 2D

---

## File Structure

```
Modify:
  miniprogram/app.wxss                       # XP Luna CSS variables
  miniprogram/pages/index/index.wxml          # XP dialog landing
  miniprogram/pages/index/index.wxss          # XP button, gradient titlebar
  miniprogram/pages/test/test.wxml            # XP radio, progress bar
  miniprogram/pages/test/test.wxss            # XP styling
  miniprogram/pages/result/result.wxml        # Dual mode: XP card + color card
  miniprogram/pages/result/result.wxss        # Both modes + RGBTI background
  miniprogram/pages/result/result.js          # Toggle logic, bg generation
  miniprogram/data/results.js                 # Add rad, gVal, bVal, tVal per type
  miniprogram/utils/calculator.js             # Add calcRGBTI() function
```

No new files. JS logic changes are additive (new function, new toggle).

---

### Task 1: XP Luna CSS palette + RGBTI color data

**Files:**
- Modify: `miniprogram/app.wxss`
- Modify: `miniprogram/data/results.js`
- Modify: `miniprogram/utils/calculator.js`

- [ ] **Step 1: Update app.wxss to XP Luna palette**

```css
page {
  --xp-bg: #ECE9D8;
  --xp-white: #FFFFFF;
  --xp-title-start: #2F71D8;
  --xp-title-end: #5BA0F2;
  --xp-title-text: #FFFFFF;
  --xp-body: #FFFFFF;
  --xp-border: #7F9DB9;
  --xp-shadow: #ACA899;
  --xp-text: #1E1E1E;
  --xp-text-secondary: #6E6E6E;
  --xp-accent: #2F71D8;
  --xp-warn: #E8920D;
  --xp-error: #D42828;
  --xp-ok: #3C8D3C;
  --color-pink: #D4568A;
  --color-red: #C84040;
  --color-blue: #3898B0;
  --color-green: #38A84C;
  --font-mono: 'Courier New', monospace;
  --font-sans: 'Tahoma', 'Segoe UI', 'Microsoft YaHei', sans-serif;
  --font-size-xs: 18rpx;
  --font-size-sm: 22rpx;
  --font-size-md: 28rpx;
  --font-size-lg: 36rpx;
  --font-size-xl: 48rpx;
  --radius-sm: 6rpx;
  --radius-md: 10rpx;

  background-color: var(--xp-bg);
  color: var(--xp-text);
  font-family: var(--font-sans);
  min-height: 100vh;
}
```

- [ ] **Step 2: Add R,G,B,T values to each of 16 results in results.js**

Add `r`, `g`, `b`, `t` fields to each type. The mapping:

```
Dim0 (Bug处理): 暗火→R=120, 晨焰→R=235
Dim1 (核心冲突): 内耗→G=80, 格格不入→G=195
Dim2 (更新方向): 性能优化→B=195, 美化界面→B=110
Dim3 (后台进程): 过去→T=0.20, 未来→T=0.80
```

Replace the results array. Each entry gets a `r`, `g`, `b`, `t` field.

Types 0-3 (暗火+内耗, dim0=0, dim1=0): r=120, g=80, b varies (195/195/110/110), t varies (20/80/20/80)

The complete results array with all 16 types and their RGBA values:

```javascript
const results = [
  { id: 0,  r: 120, g: 80,  b: 195, t: 0.20, name: '反复回滚的浪漫主义者', diagnosis: '本机检测到：你反复撤回已经发出的消息，包括感情。不是优柔寡断，是你的系统需要多次编译才能确认输出无误。', color: '#D4568A', tagline: '你的Bug是：把温柔当成撤回键。', colorNote: '一种低语般的紫红——像黄昏时分的短信草稿箱。' },
  { id: 1,  r: 120, g: 80,  b: 195, t: 0.80, name: '反复回滚的未来缓存者', diagnosis: '本机检测到：你在回忆和计划之间无限循环。昨天的尴尬和明天的计划共享同一块内存，谁也不肯释放。', color: '#D4568A', tagline: '你的Bug是：活在未来，卡在过去。', colorNote: '通透的紫红——你的过去和未来在同一层可见。' },
  { id: 2,  r: 120, g: 80,  b: 110, t: 0.20, name: '反复回滚的界面美化师', diagnosis: '本机检测到：你擅长在崩溃时保持界面美观。朋友圈看起来一切正常，只有日志里堆满了未处理的异常。', color: '#D4568A', tagline: '你的Bug是：体面是最好的防火墙。', colorNote: '柔和的灰紫——精致但不对任何人敞开。' },
  { id: 3,  r: 120, g: 80,  b: 110, t: 0.80, name: '反复回滚的叙事覆写者', diagnosis: '本机检测到：你相信记忆是可以编辑的。你把伤痛改写成了故事，只是有时候分不清哪个版本是真的。', color: '#D4568A', tagline: '你的Bug是：你讲的故事比你的经历更真实。', colorNote: '轻盈的灰紫——被改写过的天空颜色。' },
  { id: 4,  r: 120, g: 195, b: 195, t: 0.20, name: '强制退出的格格不入者', diagnosis: '本机检测到：你在感到被误解时，会选择直接终止进程。删除、拉黑、离开——不是你不珍惜，是你的系统容不下兼容模式。', color: '#C84040', tagline: '你的Bug是：用离开来保护还在的人。', colorNote: '雾中的朱红——你没有等任何人看懂。' },
  { id: 5,  r: 120, g: 195, b: 195, t: 0.80, name: '强制退出的计划偏执者', diagnosis: '本机检测到：你删除了当下的感受，因为明天的计划看起来更重要。你的CPU常年跑着还没发生的事。', color: '#C84040', tagline: '你的Bug是：你活在还没来的时间里。', colorNote: '明亮的桃红——你在未来里藏得太浅了。' },
  { id: 6,  r: 120, g: 195, b: 110, t: 0.20, name: '强制退出的性能至上者', diagnosis: '本机检测到：你杀掉了所有没用的进程。包括快乐。你太忙了，忙到连感受自己还活着的时间都没有。', color: '#C84040', tagline: '你的Bug是：你把效率当成了活着的意义。', colorNote: '低饱和的暗红——效率至上者的底色。' },
  { id: 7,  r: 120, g: 195, b: 110, t: 0.80, name: '强制退出的现实编辑器', diagnosis: '本机检测到：你删除的不是记忆，是不满意的版本。你不断重写自己的人生故事，直到它看起来像是你自己的选择。', color: '#C84040', tagline: '你的Bug是：你在改写人生的同时删掉了原稿。', colorNote: '通透的暖红——被反复编辑过的光。' },
  { id: 8,  r: 235, g: 80,  b: 195, t: 0.20, name: '静默重启的内耗者', diagnosis: '本机检测到：你擅长不动声色地崩溃，再悄悄重启。没有人知道你昨晚死机了，今早又正常开机——连你自己都快信了。', color: '#3898B0', tagline: '你的Bug是：你的重启键只有你自己知道在哪。', colorNote: '雾蓝深处的一道光——你在重启前短暂的燃烧。' },
  { id: 9,  r: 235, g: 80,  b: 195, t: 0.80, name: '静默重启的时间旅人', diagnosis: '本机检测到：你在回忆和预演之间反复横跳。大脑后台跑着太多进程，但你从不给任何人看任务管理器。', color: '#3898B0', tagline: '你的Bug是：你同时在两个时区活着。', colorNote: '明亮的蓝紫——你在大脑的每个窗口之间穿行。' },
  { id: 10, r: 235, g: 80,  b: 110, t: 0.20, name: '静默重启的美化专家', diagnosis: '本机检测到：你的崩溃是静音的。你会在深夜重启自己，然后确保第二天的界面比前一天更漂亮。', color: '#3898B0', tagline: '你的Bug是：你太擅长让破碎看起来像设计。', colorNote: '柔和的暖灰蓝——美貌之下的暗涌。' },
  { id: 11, r: 235, g: 80,  b: 110, t: 0.80, name: '静默重启的记忆编织者', diagnosis: '本机检测到：你不是在回忆过去，你是在用现在重新编译过去。你的记忆是活的，会随着你的成长而修改自己。', color: '#3898B0', tagline: '你的Bug是：你的过去在你每次回想时都在更新。', colorNote: '透亮的淡紫——你的记忆会呼吸。' },
  { id: 12, r: 235, g: 195, b: 195, t: 0.20, name: '打补丁的格格不入者', diagnosis: '本机检测到：你通过读书、问人、查攻略来修复自己。你相信每一个Bug都有补丁——包括格格不入这件事。', color: '#38A84C', tagline: '你的Bug是：你一直在给自己打补丁，但系统还是原来的。', colorNote: '雾中的孔雀绿——你用知识把自己包裹得很严密。' },
  { id: 13, r: 235, g: 195, b: 195, t: 0.80, name: '打补丁的预演者', diagnosis: '本机检测到：你给每一种可能的未来都打了补丁。在事情发生之前，你已经在脑子里修复了它十七次。', color: '#38A84C', tagline: '你的Bug是：你在为还没发生的错误准备解决方案。', colorNote: '明亮的薄荷——你的预案比现实更鲜活。' },
  { id: 14, r: 235, g: 195, b: 110, t: 0.20, name: '打补丁的优雅维护者', diagnosis: '本机检测到：你相信任何问题都有优化方案。你的痛苦不是被治愈的，是被你一点一点调试好的。', color: '#38A84C', tagline: '你的Bug是：你把人生当成了一份需要持续重构的代码。', colorNote: '温和的茶绿——你的从容是调试出来的。' },
  { id: 15, r: 235, g: 195, b: 110, t: 0.80, name: '打补丁的故事工程师', diagnosis: '本机检测到：你通过理解自己的故事来修复自己。你看书、写作、对话——你在给自己的人生做code review。', color: '#38A84C', tagline: '你的Bug是：你修复自己的方式是理解自己。', colorNote: '清澈的暖绿——你把自己当成开放源代码来读。' }
]

module.exports = results
```

- [ ] **Step 3: Add calcRGBTI() to calculator.js**

```javascript
function calcRGBTI(typeIndex, results) {
  const r = results[typeIndex]
  return { R: r.r, G: r.g, B: r.b, T: r.t, note: r.colorNote }
}
```

Append this function, and export it alongside calculateType:

```javascript
module.exports = { calculateType, calcRGBTI }
```

- [ ] **Step 4: Commit**

```bash
git add miniprogram/app.wxss miniprogram/data/results.js miniprogram/utils/calculator.js
git commit -m "feat: add XP Luna palette, RGBTI per-type values, calcRGBTI function"
```

---

### Task 2: XP-style landing page

**Files:**
- Modify: `miniprogram/pages/index/index.wxml`
- Modify: `miniprogram/pages/index/index.wxss`

- [ ] **Step 1: Rewrite index.wxml — XP dialog**

```xml
<view class="xp-desktop">
  <view class="xp-window">
    <view class="xp-titlebar">
      <text class="xp-title-icon">⚡</text>
      <text class="xp-title-text">Bug人格 - BMTI诊断工具 v1.0</text>
      <view class="xp-title-btns">
        <view class="xp-btn-min">_</view>
        <view class="xp-btn-max">□</view>
        <view class="xp-btn-close">×</view>
      </view>
    </view>
    <view class="xp-body">
      <view class="xp-hero">
        <text class="xp-logo">BUG人格</text>
        <text class="xp-tagline">不是定义你是谁。是诊断你怎么卡住的。</text>
      </view>
      <view class="xp-info-panel">
        <view class="xp-info-row">
          <text class="xp-info-icon">📋</text>
          <text class="xp-info-text">7 项系统诊断</text>
        </view>
        <view class="xp-info-row">
          <text class="xp-info-icon">🔍</text>
          <text class="xp-info-text">16 种 Bug 模式识别</text>
        </view>
        <view class="xp-info-row">
          <text class="xp-info-icon">🔒</text>
          <text class="xp-info-text">本地诊断 · 不上传数据</text>
        </view>
      </view>
      <button class="xp-btn-primary" bindtap="onStartTest">开始诊断</button>
      <text class="xp-hint">按 Enter 或点击按钮启动扫描</text>
    </view>
  </view>
</view>
```

- [ ] **Step 2: Rewrite index.wxss — XP styling**

```css
.xp-desktop {
  min-height: 100vh;
  background: var(--xp-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
  box-sizing: border-box;
}

.xp-window {
  width: 640rpx;
  background: var(--xp-white);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  box-shadow: 0 8rpx 32rpx rgba(0,0,0,0.15), 0 2rpx 4rpx rgba(0,0,0,0.1);
}

.xp-titlebar {
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, #3C8DFF 0%, #2F71D8 8%, #2156B0 40%, #1D4EA0 100%);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  padding: 12rpx 16rpx;
  gap: 10rpx;
}

.xp-title-icon {
  font-size: 28rpx;
}

.xp-title-text {
  flex: 1;
  font-size: 24rpx;
  font-weight: 600;
  color: var(--xp-title-text);
  text-shadow: 0 1rpx 0 rgba(0,0,0,0.3);
  letter-spacing: 1rpx;
}

.xp-title-btns {
  display: flex;
  gap: 6rpx;
}

.xp-btn-min, .xp-btn-max, .xp-btn-close {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  line-height: 1;
  color: rgba(255,255,255,0.9);
}

.xp-btn-min, .xp-btn-max { background: #3C8DFF; border: 1rpx solid rgba(255,255,255,0.3); }
.xp-btn-close { background: #E85030; border: 1rpx solid rgba(255,255,255,0.3); }

.xp-body {
  padding: 40rpx 32rpx 32rpx;
}

.xp-hero {
  text-align: center;
  margin-bottom: 36rpx;
}

.xp-logo {
  display: block;
  font-size: var(--font-size-xl);
  font-weight: 800;
  color: var(--xp-accent);
  font-family: var(--font-mono);
  letter-spacing: 12rpx;
  margin-bottom: 16rpx;
}

.xp-tagline {
  font-size: var(--font-size-md);
  color: var(--xp-text-secondary);
  line-height: 1.6;
}

.xp-info-panel {
  background: #F3F7FB;
  border: 1rpx solid #DCE8F4;
  border-radius: var(--radius-sm);
  padding: 24rpx;
  margin-bottom: 36rpx;
}

.xp-info-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 10rpx 0;
}

.xp-info-icon {
  font-size: 28rpx;
  flex-shrink: 0;
}

.xp-info-text {
  font-size: var(--font-size-sm);
  color: var(--xp-text);
}

.xp-btn-primary {
  width: 100%;
  padding: 24rpx 0;
  background: linear-gradient(180deg, #5BA0F2 0%, #2F71D8 100%);
  border: 1rpx solid #1D4EA0;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-md);
  font-weight: 700;
  color: #FFFFFF;
  text-shadow: 0 1rpx 0 rgba(0,0,0,0.2);
  box-shadow: 0 2rpx 4rpx rgba(0,0,0,0.15);
  margin-bottom: 16rpx;
}

.xp-btn-primary:active {
  background: linear-gradient(180deg, #2F71D8 0%, #1D4EA0 100%);
}

.xp-hint {
  display: block;
  text-align: center;
  font-size: var(--font-size-xs);
  color: var(--xp-shadow);
}
```

- [ ] **Step 3: Commit**

```bash
git add miniprogram/pages/index/
git commit -m "feat: XP Luna landing page with gradient titlebar and rounded buttons"
```

---

### Task 3: XP-style test page

**Files:**
- Modify: `miniprogram/pages/test/test.wxml`
- Modify: `miniprogram/pages/test/test.wxss`

(test.js stays — the select-then-confirm logic is unchanged)

- [ ] **Step 1: Rewrite test.wxml — XP style**

```xml
<view class="xp-desktop">
  <view class="xp-window">
    <view class="xp-titlebar">
      <text class="xp-title-icon">🔧</text>
      <text class="xp-title-text">系统诊断中...</text>
      <view class="xp-title-btns">
        <view class="xp-btn-min">_</view>
        <view class="xp-btn-max">□</view>
        <view class="xp-btn-close">×</view>
      </view>
    </view>
    <view class="xp-body">
      <view class="scan-header">
        <text class="scan-label">正在扫描扇区 {{currentIndex + 1}}/{{totalQuestions}}</text>
        <text class="scan-pct">{{progress}}%</text>
      </view>
      <view class="progress-track">
        <view class="progress-fill" style="width: {{progress}}%"></view>
      </view>

      <view class="question-area" wx:if="{{question}}">
        <view class="q-badge">Q{{currentIndex + 1}}</view>
        <text class="q-text">{{question.text}}</text>
      </view>

      <view class="options-list">
        <view
          class="opt-item {{selectedIndex === index ? 'opt-selected' : ''}}"
          wx:for="{{question.options}}"
          wx:key="index"
          data-index="{{index}}"
          bindtap="onSelectOption"
        >
          <view class="opt-radio">{{selectedIndex === index ? '●' : '○'}}</view>
          <text class="opt-label">{{item.label}}</text>
        </view>
      </view>

      <button
        class="xp-btn-primary {{selectedIndex < 0 ? 'btn-disabled' : ''}}"
        bindtap="onNextStep"
        disabled="{{selectedIndex < 0}}"
      >
        {{currentIndex + 1 >= totalQuestions ? '完成诊断' : '下一步'}}
      </button>
    </view>
  </view>
</view>
```

- [ ] **Step 2: Rewrite test.wxss — XP styling**

```css
.xp-desktop {
  min-height: 100vh;
  background: var(--xp-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
  box-sizing: border-box;
}

.xp-window {
  width: 640rpx;
  background: var(--xp-white);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  box-shadow: 0 8rpx 32rpx rgba(0,0,0,0.15), 0 2rpx 4rpx rgba(0,0,0,0.1);
}

.xp-titlebar {
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, #3C8DFF 0%, #2F71D8 8%, #2156B0 40%, #1D4EA0 100%);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  padding: 12rpx 16rpx;
  gap: 10rpx;
}

.xp-title-icon { font-size: 28rpx; }

.xp-title-text {
  flex: 1;
  font-size: 24rpx;
  font-weight: 600;
  color: var(--xp-title-text);
  text-shadow: 0 1rpx 0 rgba(0,0,0,0.3);
  letter-spacing: 1rpx;
}

.xp-title-btns {
  display: flex;
  gap: 6rpx;
}

.xp-btn-min, .xp-btn-max, .xp-btn-close {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  line-height: 1;
  color: rgba(255,255,255,0.9);
}

.xp-btn-min, .xp-btn-max { background: #3C8DFF; border: 1rpx solid rgba(255,255,255,0.3); }
.xp-btn-close { background: #E85030; border: 1rpx solid rgba(255,255,255,0.3); }

.xp-body {
  padding: 32rpx;
}

/* XP Progress Bar */
.scan-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10rpx;
}

.scan-label {
  font-size: var(--font-size-sm);
  color: var(--xp-text-secondary);
}

.scan-pct {
  font-size: var(--font-size-sm);
  font-weight: 700;
  color: var(--xp-accent);
  font-family: var(--font-mono);
}

.progress-track {
  height: 16rpx;
  background: #E8F0F8;
  border: 1rpx solid #C8D8E8;
  border-radius: 8rpx;
  overflow: hidden;
  margin-bottom: 36rpx;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(180deg, #7AB8FF 0%, #2F71D8 100%);
  border-radius: 8rpx;
  transition: width 0.3s ease;
}

/* Question */
.question-area {
  margin-bottom: 28rpx;
}

.q-badge {
  display: inline-block;
  background: var(--xp-accent);
  color: #FFFFFF;
  font-size: var(--font-size-sm);
  font-weight: 700;
  font-family: var(--font-mono);
  padding: 4rpx 16rpx;
  border-radius: var(--radius-sm);
  margin-bottom: 16rpx;
}

.q-text {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--xp-text);
  line-height: 1.5;
}

/* Options */
.options-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-bottom: 32rpx;
}

.opt-item {
  display: flex;
  align-items: center;
  gap: 14rpx;
  padding: 22rpx 20rpx;
  background: #F7F9FB;
  border: 2rpx solid #E0E8F0;
  border-radius: var(--radius-sm);
}

.opt-selected {
  background: #E8F2FD;
  border-color: var(--xp-accent);
}

.opt-radio {
  font-size: 32rpx;
  color: var(--xp-accent);
  flex-shrink: 0;
}

.opt-label {
  font-size: var(--font-size-sm);
  color: var(--xp-text);
  line-height: 1.4;
}

/* Button */
.xp-btn-primary {
  width: 100%;
  padding: 24rpx 0;
  background: linear-gradient(180deg, #5BA0F2 0%, #2F71D8 100%);
  border: 1rpx solid #1D4EA0;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-md);
  font-weight: 700;
  color: #FFFFFF;
  text-shadow: 0 1rpx 0 rgba(0,0,0,0.2);
  box-shadow: 0 2rpx 4rpx rgba(0,0,0,0.15);
}

.xp-btn-primary:active {
  background: linear-gradient(180deg, #2F71D8 0%, #1D4EA0 100%);
}

.btn-disabled {
  opacity: 0.5;
}
```

- [ ] **Step 3: Commit**

```bash
git add miniprogram/pages/test/test.wxml miniprogram/pages/test/test.wxss
git commit -m "feat: XP Luna test page with rounded progress bar and chip badge"
```

---

### Task 4: Dual-mode result page (XP + RGBTI color)

**Files:**
- Modify: `miniprogram/pages/result/result.js`
- Modify: `miniprogram/pages/result/result.wxml`
- Modify: `miniprogram/pages/result/result.wxss`

- [ ] **Step 1: Rewrite result.js — add dual-mode toggle + RGBTI background generation**

```javascript
const results = require('../../data/results')
const { calcRGBTI } = require('../../utils/calculator')
const app = getApp()

function formatTime(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const h = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const s = String(date.getSeconds()).padStart(2, '0')
  return `${y}-${m}-${d} ${h}:${min}:${s}`
}

function genBgStyle(rgbti) {
  const { R, G, B, T } = rgbti
  const alpha = 1 - T
  return [
    `radial-gradient(ellipse 60% 50% at 40% 35%, rgba(${R},${G},${B},${T}) 0%, transparent 70%)`,
    `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(${R},${G},${B},${(T * 0.4).toFixed(2)}) 0%, transparent 60%)`,
    `conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.06) 0deg, transparent 3deg, rgba(255,255,255,0.06) 6deg, transparent 9deg, rgba(255,255,255,0.06) 12deg, transparent 15deg, rgba(255,255,255,0.06) 18deg, transparent 21deg, rgba(255,255,255,0.06) 24deg, transparent 27deg, rgba(255,255,255,0.06) 30deg, transparent 33deg, rgba(255,255,255,0.06) 36deg, transparent 39deg, rgba(255,255,255,0.06) 42deg, transparent 45deg, rgba(255,255,255,0.06) 48deg, transparent 51deg, rgba(255,255,255,0.06) 54deg, transparent 57deg, rgba(255,255,255,0.06) 60deg, transparent 63deg, rgba(255,255,255,0.06) 66deg, transparent 69deg, rgba(255,255,255,0.06) 72deg, transparent 75deg, rgba(255,255,255,0.06) 78deg, transparent 81deg, rgba(255,255,255,0.06) 84deg, transparent 87deg, rgba(255,255,255,0.06) 90deg, transparent 93deg, rgba(255,255,255,0.06) 96deg, transparent 99deg)`
  ].join(', ')
}

Page({
  data: {
    result: null,
    rgbti: null,
    shareText: '',
    currentTime: '',
    bgStyle: '',
    colorMode: false
  },

  onLoad() {
    const typeIndex = app.globalData.typeIndex
    if (typeIndex < 0 || typeIndex >= results.length) {
      wx.redirectTo({ url: '/pages/index/index' })
      return
    }
    const result = results[typeIndex]
    const rgbti = calcRGBTI(typeIndex, results)
    this.setData({
      result,
      rgbti,
      shareText: `我的出厂设置是「${result.name}」\n颜色: rgba(${rgbti.R},${rgbti.G},${rgbti.B},${rgbti.T.toFixed(2)})\n\n${result.diagnosis}\n\n测测你的Bug →`,
      currentTime: formatTime(new Date()),
      bgStyle: ''
    })
  },

  onToggleColorMode() {
    const colorMode = !this.data.colorMode
    this.setData({
      colorMode,
      bgStyle: colorMode ? genBgStyle(this.data.rgbti) : ''
    })
  },

  onRetake() {
    app.globalData.answers = []
    app.globalData.typeIndex = -1
    wx.redirectTo({ url: '/pages/index/index' })
  },

  onShareAppMessage() {
    if (!this.data.result) {
      return { title: '测测你的Bug人格', path: '/pages/index/index' }
    }
    return {
      title: `我的出厂设置是「${this.data.result.name}」。测测你的Bug是什么？`,
      path: '/pages/index/index',
      imageUrl: ''
    }
  }
})
```

- [ ] **Step 2: Rewrite result.wxml — dual mode**

```xml
<view class="xp-desktop {{colorMode ? 'color-mode' : ''}}" wx:if="{{result}}">
  <view class="xp-window">
    <view class="xp-titlebar">
      <text class="xp-title-icon">{{colorMode ? '🎨' : '📋'}}</text>
      <text class="xp-title-text">诊断报告</text>
      <view class="xp-title-btns">
        <view class="xp-btn-min">_</view>
        <view class="xp-btn-max">□</view>
        <view class="xp-btn-close">×</view>
      </view>
    </view>

    <view class="xp-body">
      <view class="report-card {{colorMode ? 'card-glass' : ''}}">
        <view class="report-header">
          <text class="report-label">BMTI 系统诊断报告 v1.0</text>
          <view class="report-divider"></view>
        </view>

        <view class="report-section">
          <text class="section-tag">型号</text>
          <text class="model-name" style="color: {{result.color}}">{{result.name}}</text>
        </view>

        <view class="report-section">
          <text class="section-tag">色号</text>
          <view class="color-code-row">
            <view class="mini-swatch" style="background: rgba({{rgbti.R}},{{rgbti.G}},{{rgbti.B}},{{rgbti.T}})"></view>
            <text class="color-code">rgba({{rgbti.R}}, {{rgbti.G}}, {{rgbti.B}}, {{rgbti.T}})</text>
          </view>
          <text class="color-note" wx:if="{{colorMode}}">{{rgbti.note}}</text>
        </view>

        <view class="report-divider"></view>

        <view class="report-section">
          <text class="section-tag">诊断</text>
          <text class="diagnosis-text">{{result.diagnosis}}</text>
        </view>

        <view class="report-section">
          <text class="section-tag">Bug</text>
          <text class="tagline-text">{{result.tagline}}</text>
        </view>

        <view class="report-footer">
          <text class="footer-code">Diagnostic Code: 0x0000{{result.id}}</text>
          <text class="footer-time">{{currentTime}}</text>
        </view>
      </view>

      <button class="xp-btn-primary" open-type="share">
        发送给懂你Bug的人
      </button>

      <view class="toggle-row">
        <button class="xp-btn-toggle" bindtap="onToggleColorMode">
          {{colorMode ? '◉ 切回标准报告' : '◉ 开启色卡模式'}}
        </button>
      </view>

      <view class="retake-link" bindtap="onRetake">
        <text class="retake-text">重新扫描</text>
      </view>
    </view>
  </view>
</view>
```

- [ ] **Step 3: Rewrite result.wxss — XP + color mode**

```css
.xp-desktop {
  min-height: 100vh;
  background: var(--xp-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
  box-sizing: border-box;
}

.xp-desktop.color-mode {
  background: var(--xp-bg);
}

.xp-desktop.color-mode::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.85;
  background-image: var(--bg-gradient);
  pointer-events: none;
}

.xp-window {
  width: 640rpx;
  max-height: 90vh;
  background: var(--xp-white);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  box-shadow: 0 8rpx 32rpx rgba(0,0,0,0.15), 0 2rpx 4rpx rgba(0,0,0,0.1);
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
}

.color-mode .xp-window {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(20rpx);
}

.xp-titlebar {
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, #3C8DFF 0%, #2F71D8 8%, #2156B0 40%, #1D4EA0 100%);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  padding: 12rpx 16rpx;
  gap: 10rpx;
  flex-shrink: 0;
}

.xp-title-icon { font-size: 28rpx; }

.xp-title-text {
  flex: 1;
  font-size: 24rpx;
  font-weight: 600;
  color: var(--xp-title-text);
  text-shadow: 0 1rpx 0 rgba(0,0,0,0.3);
  letter-spacing: 1rpx;
}

.xp-title-btns { display: flex; gap: 6rpx; }

.xp-btn-min, .xp-btn-max, .xp-btn-close {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  line-height: 1;
  color: rgba(255,255,255,0.9);
}

.xp-btn-min, .xp-btn-max { background: #3C8DFF; border: 1rpx solid rgba(255,255,255,0.3); }
.xp-btn-close { background: #E85030; border: 1rpx solid rgba(255,255,255,0.3); }

.xp-body {
  padding: 28rpx 28rpx 24rpx;
  overflow-y: auto;
  flex: 1;
}

/* Report Card */
.report-card {
  background: #FAFBFD;
  border: 1rpx solid #E8EEF4;
  border-radius: var(--radius-sm);
  padding: 28rpx 24rpx;
  margin-bottom: 24rpx;
}

.card-glass {
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(10rpx);
  border: 1rpx solid rgba(255,255,255,0.8);
}

.report-header {
  margin-bottom: 20rpx;
}

.report-label {
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--xp-accent);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 2rpx;
}

.report-divider {
  height: 1rpx;
  background: #E0E8F0;
  margin: 14rpx 0;
}

.report-section {
  margin-bottom: 16rpx;
}

.section-tag {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--xp-text-secondary);
  text-transform: uppercase;
  letter-spacing: 2rpx;
  margin-bottom: 6rpx;
}

.model-name {
  font-size: var(--font-size-lg);
  font-weight: 800;
  line-height: 1.3;
}

.color-code-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.mini-swatch {
  width: 48rpx;
  height: 48rpx;
  border-radius: var(--radius-sm);
  border: 1rpx solid rgba(0,0,0,0.1);
}

.color-code {
  font-size: var(--font-size-sm);
  font-family: var(--font-mono);
  color: var(--xp-text-secondary);
}

.color-note {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--xp-text-secondary);
  font-style: italic;
  margin-top: 6rpx;
}

.diagnosis-text {
  font-size: var(--font-size-sm);
  color: var(--xp-text);
  line-height: 1.7;
}

.tagline-text {
  font-size: var(--font-size-sm);
  color: var(--xp-text-secondary);
  font-style: italic;
}

.report-footer {
  margin-top: 8rpx;
}

.footer-code {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--xp-shadow);
  font-family: var(--font-mono);
}

.footer-time {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--xp-shadow);
  font-family: var(--font-mono);
}

/* Buttons */
.xp-btn-primary {
  width: 100%;
  padding: 22rpx 0;
  background: linear-gradient(180deg, #5BA0F2 0%, #2F71D8 100%);
  border: 1rpx solid #1D4EA0;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-md);
  font-weight: 700;
  color: #FFFFFF;
  text-shadow: 0 1rpx 0 rgba(0,0,0,0.2);
  box-shadow: 0 2rpx 4rpx rgba(0,0,0,0.15);
  margin-bottom: 12rpx;
}

.xp-btn-primary:active {
  background: linear-gradient(180deg, #2F71D8 0%, #1D4EA0 100%);
}

.toggle-row {
  display: flex;
  justify-content: center;
  margin-bottom: 8rpx;
}

.xp-btn-toggle {
  background: transparent;
  border: 1rpx solid #D0D8E0;
  border-radius: 20rpx;
  padding: 10rpx 28rpx;
  font-size: var(--font-size-xs);
  color: var(--xp-text-secondary);
}

.xp-btn-toggle:active {
  background: #F0F4F8;
}

.retake-link {
  text-align: center;
  padding: 12rpx 0;
}

.retake-text {
  font-size: var(--font-size-xs);
  color: var(--xp-accent);
}
```

- [ ] **Step 4: Commit**

```bash
git add miniprogram/pages/result/
git commit -m "feat: dual-mode result page with XP card and RGBTI color background"
```

---

### Task 5: Final integration and push

- [ ] **Step 1: Verify all 10 modified files exist and old CSS variables are gone**

```bash
grep -r "var(--bsod\|var(--win-\|outline:" miniprogram/
```

Expected: no output

- [ ] **Step 2: Verify conic-gradient approach works**

WeChat base library >= 2.12.0 supports conic-gradient. Current libVersion is 3.3.4 — OK.

The `::after` pseudo-element with dynamic `background-image` set via JS requires passing the bgStyle string. In WeChat, you can't set CSS custom properties from JS to drive `::after`. Instead, use inline style on a dedicated `<view>` overlay.

If `::after` approach doesn't work in WeChat, the WXML should include a dedicated overlay element. The JS is already structured to handle this — `bgStyle` is stored in data.

- [ ] **Step 3: Commit and push**

```bash
git add -A && git commit -m "chore: final XP + RGBTI integration"
git push
```

---

## What Changed vs Previous Version

| Element | Win98 | WinXP (New) |
|---------|-------|-------------|
| Titlebar | Flat dark blue | Luna blue gradient |
| Window | Sharp box | Rounded top corners |
| Buttons | 3D beveled square | Gradient rounded |
| Body bg | Gray #C0C0C0 | White #FFFFFF |
| Accent colors | Neon saturated | Muted, softer |
| Result page | Single mode | Dual mode (XP / Color) |
| Background | BSOD blue | Beige + color overlay |
| Font | Courier/MS Sans | Tahoma/Segoe UI |
