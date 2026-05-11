# Bug人格 MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a WeChat mini-program MVP for "Bug人格" — a personality test using Bug/system-failure metaphors that outputs 16 personality types with shareable result cards.

**Architecture:** Pure client-side mini-program with no backend. All question/result data is static JSON. Answer-to-type mapping uses a 4-dimension scoring algorithm (2^4 = 16 types). Share card generated via Canvas API. No cloud functions needed for MVP.

**Tech Stack:** WeChat Mini Program native framework (WXML + WXSS + JS), WeChat Canvas API

**Design constraints:** Black-white base + high-saturation accent colors + pixel aesthetic. Cold, sharp, anti-cute visual language.

---

## File Structure

```
F:\Jarvis\
├── miniprogram/
│   ├── app.js                          # App lifecycle, global data
│   ├── app.json                        # Page registration, window config
│   ├── app.wxss                        # Global styles, CSS variables
│   ├── pages/
│   │   ├── index/                      # Landing page
│   │   │   ├── index.js
│   │   │   ├── index.json
│   │   │   ├── index.wxml
│   │   │   └── index.wxss
│   │   ├── test/                       # Quiz flow (7 questions)
│   │   │   ├── test.js
│   │   │   ├── test.json
│   │   │   ├── test.wxml
│   │   │   └── test.wxss
│   │   └── result/                     # Result + share card
│   │       ├── result.js
│   │       ├── result.json
│   │       ├── result.wxml
│   │       └── result.wxss
│   ├── data/
│   │   ├── questions.js                # 7 questions with options
│   │   └── results.js                  # 16 personality types
│   └── utils/
│       └── calculator.js               # Score → type mapping
├── project.config.json                 # Mini-program project config
├── sitemap.json                        # Search indexing config
└── v0.txt                              # Product doc (existing)
```

Each file has one clear responsibility:
- `data/questions.js` — question content only, no logic
- `data/results.js` — 16 result type content only, no logic
- `utils/calculator.js` — pure function mapping answers → type index
- Pages own their own UI state and interaction

---

### Task 1: Project scaffolding and configuration

**Files:**
- Create: `project.config.json`
- Create: `sitemap.json`
- Create: `miniprogram/app.json`
- Create: `miniprogram/app.js`
- Create: `miniprogram/app.wxss`

- [ ] **Step 1: Create project.config.json**

```json
{
  "description": "Bug人格 - Bug Management Type Indicator",
  "packOptions": { "ignore": [], "include": [] },
  "setting": {
    "bundle": false,
    "userConfirmedBundleSwitch": false,
    "urlCheck": true,
    "scopeDataCheck": false,
    "coverView": true,
    "es6": true,
    "postcss": true,
    "compileHotReLoad": false,
    "lazyloadPlaceholderEnable": false,
    "preloadBackgroundData": false,
    "minified": true,
    "autoAudits": false,
    "newFeature": false,
    "uglifyFileName": false,
    "uploadWithSourceMap": true,
    "useIsolateContext": true,
    "nodeModules": false,
    "enhance": true,
    "useMultiFrameRuntime": true,
    "useApiHook": true,
    "useApiHostProcess": true,
    "showShadowRootInWxmlPanel": true,
    "packNpmManually": false,
    "packNpmRelationList": [],
    "minifyWXSS": true,
    "showES6CompileOption": false,
    "minifyWXML": true,
    "babelSetting": { "ignore": [], "disablePlugins": [], "outputPath": "" }
  },
  "compileType": "miniprogram",
  "libVersion": "3.3.4",
  "appid": "wx0000000000000000",
  "projectname": "bug-personality",
  "condition": {},
  "editorType": "stable"
}
```

Note: Replace `appid` with your actual WeChat AppID. Use "touristappid" for development without registration.

- [ ] **Step 2: Create sitemap.json**

```json
{
  "rules": [{ "action": "allow", "page": "*" }]
}
```

- [ ] **Step 3: Create miniprogram/app.json**

```json
{
  "pages": [
    "pages/index/index",
    "pages/test/test",
    "pages/result/result"
  ],
  "window": {
    "navigationBarTitleText": "Bug人格",
    "navigationBarBackgroundColor": "#000000",
    "navigationBarTextStyle": "white",
    "backgroundColor": "#000000",
    "backgroundTextStyle": "light"
  },
  "sitemapLocation": "sitemap.json"
}
```

- [ ] **Step 4: Create miniprogram/app.js**

```javascript
App({
  globalData: {
    // Stores answer array from test, e.g. [1, 0, 2, 1, 0, 1, 0]
    answers: [],
    // Stores final type index (0-15)
    typeIndex: -1
  }
})
```

- [ ] **Step 5: Create miniprogram/app.wxss**

```css
/* CSS variables for the design system */
page {
  --bg-primary: #000000;
  --bg-secondary: #1a1a1a;
  --text-primary: #ffffff;
  --text-secondary: #888888;
  --accent-green: #00ff41;
  --accent-pink: #ff69b4;
  --accent-red: #ff3333;
  --accent-blue: #00d4ff;
  --font-mono: 'Courier New', monospace;
  --font-sans: -apple-system, 'Helvetica Neue', sans-serif;

  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-sans);
  min-height: 100vh;
}
```

- [ ] **Step 6: Commit**

```bash
git init
git add -A
git commit -m "feat: scaffold mini-program project structure"
```

---

### Task 2: Question data and scoring algorithm

**Files:**
- Create: `miniprogram/data/questions.js`
- Create: `miniprogram/data/results.js`
- Create: `miniprogram/utils/calculator.js`

- [ ] **Step 1: Create questions data**

```javascript
// miniprogram/data/questions.js
// 7 questions, each option carries a dimension value (0 or 1)
// Dimensions: D1=Bug处理, D2=核心冲突, D3=更新方向, D4=后台进程

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
```

- [ ] **Step 2: Create results data (16 types)**

```javascript
// miniprogram/data/results.js
// 16 personality types, indexed 0-15
// Each type has: name, diagnosis, color (for accent), tagline
// Type index = D1*8 + D2*4 + D3*2 + D4*1

const results = [
  {
    id: 0,
    name: '反复回滚的浪漫主义者',
    diagnosis: '本机检测到：你反复撤回已经发出的消息，包括感情。不是优柔寡断，是你的系统需要多次编译才能确认输出无误。',
    color: '#ff69b4',
    tagline: '你的Bug是：把温柔当成撤回键。'
  },
  {
    id: 1,
    name: '反复回滚的未来缓存者',
    diagnosis: '本机检测到：你在回忆和计划之间无限循环。昨天的尴尬和明天的计划共享同一块内存，谁也不肯释放。',
    color: '#ff69b4',
    tagline: '你的Bug是：活在未来，卡在过去。'
  },
  {
    id: 2,
    name: '反复回滚的界面美化师',
    diagnosis: '本机检测到：你擅长在崩溃时保持界面美观。朋友圈看起来一切正常，只有日志里堆满了未处理的异常。',
    color: '#ff69b4',
    tagline: '你的Bug是：体面是最好的防火墙。'
  },
  {
    id: 3,
    name: '反复回滚的叙事覆写者',
    diagnosis: '本机检测到：你相信记忆是可以编辑的。你把伤痛改写成了故事，只是有时候分不清哪个版本是真的。',
    color: '#ff69b4',
    tagline: '你的Bug是：你讲的故事比你的经历更真实。'
  },
  {
    id: 4,
    name: '强制退出的格格不入者',
    diagnosis: '本机检测到：你在感到被误解时，会选择直接终止进程。删除、拉黑、离开——不是你不珍惜，是你的系统容不下兼容模式。',
    color: '#ff3333',
    tagline: '你的Bug是：用离开来保护还在的人。'
  },
  {
    id: 5,
    name: '强制退出的计划偏执者',
    diagnosis: '本机检测到：你删除了当下的感受，因为明天的计划看起来更重要。你的CPU常年跑着还没发生的事。',
    color: '#ff3333',
    tagline: '你的Bug是：你活在还没来的时间里。'
  },
  {
    id: 6,
    name: '强制退出的性能至上者',
    diagnosis: '本机检测到：你杀掉了所有"没用"的进程。包括快乐。你太忙了，忙到连感受自己还活着的时间都没有。',
    color: '#ff3333',
    tagline: '你的Bug是：你把效率当成了活着的意义。'
  },
  {
    id: 7,
    name: '强制退出的现实编辑器',
    diagnosis: '本机检测到：你删除的不是记忆，是不满意的版本。你不断重写自己的人生故事，直到它看起来像是你自己的选择。',
    color: '#ff3333',
    tagline: '你的Bug是：你在改写人生的同时删掉了原稿。'
  },
  {
    id: 8,
    name: '静默重启的内耗者',
    diagnosis: '本机检测到：你擅长不动声色地崩溃，再悄悄重启。没有人知道你昨晚死机了，今早又正常开机——连你自己都快信了。',
    color: '#00d4ff',
    tagline: '你的Bug是：你的重启键只有你自己知道在哪。'
  },
  {
    id: 9,
    name: '静默重启的时间旅人',
    diagnosis: '本机检测到：你在回忆和预演之间反复横跳。大脑后台跑着太多进程，但你从不给任何人看任务管理器。',
    color: '#00d4ff',
    tagline: '你的Bug是：你同时在两个时区活着。'
  },
  {
    id: 10,
    name: '静默重启的美化专家',
    diagnosis: '本机检测到：你的崩溃是静音的。你会在深夜重启自己，然后确保第二天的界面比前一天更漂亮。',
    color: '#00d4ff',
    tagline: '你的Bug是：你太擅长让破碎看起来像设计。'
  },
  {
    id: 11,
    name: '静默重启的记忆编织者',
    diagnosis: '本机检测到：你不是在回忆过去，你是在用现在重新编译过去。你的记忆是活的，会随着你的成长而修改自己。',
    color: '#00d4ff',
    tagline: '你的Bug是：你的过去在你每次回想时都在更新。'
  },
  {
    id: 12,
    name: '打补丁的格格不入者',
    diagnosis: '本机检测到：你通过读书、问人、查攻略来修复自己。你相信每一个Bug都有补丁——包括"格格不入"这件事。',
    color: '#00ff41',
    tagline: '你的Bug是：你一直在给自己打补丁，但系统还是原来的。'
  },
  {
    id: 13,
    name: '打补丁的预演者',
    diagnosis: '本机检测到：你给每一种可能的未来都打了补丁。在事情发生之前，你已经在脑子里修复了它十七次。',
    color: '#00ff41',
    tagline: '你的Bug是：你在为还没发生的错误准备解决方案。'
  },
  {
    id: 14,
    name: '打补丁的优雅维护者',
    diagnosis: '本机检测到：你相信任何问题都有优化方案。你的痛苦不是被治愈的，是被你一点一点调试好的。',
    color: '#00ff41',
    tagline: '你的Bug是：你把人生当成了一份需要持续重构的代码。'
  },
  {
    id: 15,
    name: '打补丁的故事工程师',
    diagnosis: '本机检测到：你通过理解自己的故事来修复自己。你看书、写作、对话——你在给自己的人生做code review。',
    color: '#00ff41',
    tagline: '你的Bug是：你修复自己的方式是理解自己。'
  }
]

module.exports = results
```

- [ ] **Step 3: Create scoring calculator**

```javascript
// miniprogram/utils/calculator.js
// Maps 7 answers → 4 dimension scores → type index (0-15)
// Each answer has a `dim` (0-3) and `value` (0 or 1)
// For dimensions with multiple questions, use majority vote (or average > 0.5)

function calculateType(answers) {
  // answers: array of selected option objects, length 7
  // Each option: { label, value: 0|1, dim: 0|1|2|3 }

  const dimSums = [0, 0, 0, 0] // sum of values per dimension
  const dimCounts = [0, 0, 0, 0] // number of questions per dimension

  answers.forEach(option => {
    dimSums[option.dim] += option.value
    dimCounts[option.dim] += 1
  })

  // Convert to binary: if average >= 0.5, dimension = 1
  const d0 = dimSums[0] / dimCounts[0] >= 0.5 ? 1 : 0
  const d1 = dimSums[1] / dimCounts[1] >= 0.5 ? 1 : 0
  const d2 = dimSums[2] / dimCounts[2] >= 0.5 ? 1 : 0
  const d3 = dimSums[3] / dimCounts[3] >= 0.5 ? 1 : 0

  // Type index: D1*8 + D2*4 + D3*2 + D4*1
  return d0 * 8 + d1 * 4 + d2 * 2 + d3 * 1
}

module.exports = { calculateType }
```

- [ ] **Step 4: Commit**

```bash
git add miniprogram/data/ miniprogram/utils/
git commit -m "feat: add question bank, 16 personality types, and scoring algorithm"
```

---

### Task 3: Landing page (index)

**Files:**
- Create: `miniprogram/pages/index/index.js`
- Create: `miniprogram/pages/index/index.json`
- Create: `miniprogram/pages/index/index.wxml`
- Create: `miniprogram/pages/index/index.wxss`

- [ ] **Step 1: Create index.json (page config)**

```json
{
  "usingComponents": {},
  "navigationBarTitleText": "Bug人格"
}
```

- [ ] **Step 2: Create index.js (page logic)**

```javascript
Page({
  onStartTest() {
    wx.navigateTo({ url: '/pages/test/test' })
  }
})
```

- [ ] **Step 3: Create index.wxml (template)**

```xml
<view class="container">
  <view class="hero">
    <text class="hero-glitch">BUG人格</text>
    <text class="hero-subtitle">Bug Management Type Indicator</text>
  </view>

  <view class="description">
    <text class="desc-line">不是定义你是谁。</text>
    <text class="desc-line accent">是诊断你怎么卡住的。</text>
  </view>

  <view class="meta-info">
    <text class="meta-item">· 7 道诊断题</text>
    <text class="meta-item">· 16 种出厂设置</text>
    <text class="meta-item">· 1 份系统报告</text>
  </view>

  <view class="start-btn" bindtap="onStartTest">
    <text class="btn-text">开始诊断</text>
    <text class="btn-hint">[ 按下以运行检测程序 ]</text>
  </view>

  <view class="footer">
    <text class="footer-text">没有服务器会保存你的Bug记录。</text>
    <text class="footer-text">这一切只发生在你的设备上。</text>
  </view>
</view>
```

- [ ] **Step 4: Create index.wxss (styles)**

```css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 60rpx 40rpx;
  box-sizing: border-box;
}

.hero {
  text-align: center;
  margin-bottom: 80rpx;
}

.hero-glitch {
  font-size: 96rpx;
  font-weight: 900;
  font-family: var(--font-mono);
  color: var(--accent-green);
  letter-spacing: 16rpx;
  text-shadow: 4rpx 4rpx 0 var(--accent-red);
}

.hero-subtitle {
  display: block;
  font-size: 24rpx;
  font-family: var(--font-mono);
  color: var(--text-secondary);
  margin-top: 16rpx;
  letter-spacing: 4rpx;
}

.description {
  text-align: center;
  margin-bottom: 60rpx;
}

.desc-line {
  display: block;
  font-size: 32rpx;
  color: var(--text-primary);
  line-height: 1.8;
}

.desc-line.accent {
  color: var(--accent-green);
  font-family: var(--font-mono);
}

.meta-info {
  display: flex;
  gap: 32rpx;
  margin-bottom: 100rpx;
}

.meta-item {
  font-size: 22rpx;
  color: var(--text-secondary);
  font-family: var(--font-mono);
}

.start-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32rpx 80rpx;
  border: 2rpx solid var(--accent-green);
  margin-bottom: 120rpx;
}

.btn-text {
  font-size: 36rpx;
  font-weight: 700;
  color: var(--accent-green);
  font-family: var(--font-mono);
}

.btn-hint {
  font-size: 20rpx;
  color: var(--text-secondary);
  margin-top: 8rpx;
  font-family: var(--font-mono);
}

.footer {
  text-align: center;
}

.footer-text {
  display: block;
  font-size: 20rpx;
  color: var(--text-secondary);
  line-height: 1.8;
}
```

- [ ] **Step 5: Commit**

```bash
git add miniprogram/pages/index/
git commit -m "feat: add landing page with glitch aesthetic"
```

---

### Task 4: Test page (7-question quiz flow)

**Files:**
- Create: `miniprogram/pages/test/test.js`
- Create: `miniprogram/pages/test/test.json`
- Create: `miniprogram/pages/test/test.wxml`
- Create: `miniprogram/pages/test/test.wxss`

- [ ] **Step 1: Create test.json**

```json
{
  "usingComponents": {},
  "navigationBarTitleText": "系统诊断中..."
}
```

- [ ] **Step 2: Create test.js**

```javascript
const questions = require('../../data/questions')
const { calculateType } = require('../../utils/calculator')
const app = getApp()

Page({
  data: {
    currentIndex: 0,
    totalQuestions: questions.length,
    question: null,
    progress: 0,
    answers: []
  },

  onLoad() {
    this.setData({
      totalQuestions: questions.length,
      question: questions[0],
      progress: 0
    })
  },

  onSelectOption(e) {
    const optionIndex = e.currentTarget.dataset.index
    const selectedOption = this.data.question.options[optionIndex]
    const answers = [...this.data.answers, selectedOption]
    const nextIndex = this.data.currentIndex + 1

    if (nextIndex >= questions.length) {
      // Test complete
      app.globalData.answers = answers
      app.globalData.typeIndex = calculateType(answers)
      wx.redirectTo({ url: '/pages/result/result' })
    } else {
      // Next question
      this.setData({
        currentIndex: nextIndex,
        question: questions[nextIndex],
        progress: Math.round((nextIndex / questions.length) * 100),
        answers
      })
    }
  }
})
```

- [ ] **Step 3: Create test.wxml**

```xml
<view class="container">
  <!-- Progress bar -->
  <view class="progress-wrap">
    <view class="progress-bar" style="width: {{progress}}%"></view>
    <text class="progress-text">{{currentIndex + 1}} / {{totalQuestions}}</text>
  </view>

  <!-- Question -->
  <view class="question-block" wx:if="{{question}}">
    <text class="question-number">[ Q{{currentIndex + 1}} ]</text>
    <text class="question-text">{{question.text}}</text>
  </view>

  <!-- Options -->
  <view class="options-list">
    <view
      class="option-item"
      wx:for="{{question.options}}"
      wx:key="index"
      data-index="{{index}}"
      bindtap="onSelectOption"
    >
      <text class="option-marker">{{index === 0 ? 'A' : index === 1 ? 'B' : 'C'}}.</text>
      <text class="option-label">{{item.label}}</text>
    </view>
  </view>
</view>
```

- [ ] **Step 4: Create test.wxss**

```css
.container {
  min-height: 100vh;
  padding: 40rpx;
  box-sizing: border-box;
}

.progress-wrap {
  position: relative;
  height: 4rpx;
  background: #333;
  margin-bottom: 80rpx;
}

.progress-bar {
  height: 100%;
  background: var(--accent-green);
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  right: 0;
  top: -36rpx;
  font-size: 22rpx;
  color: var(--text-secondary);
  font-family: var(--font-mono);
}

.question-block {
  margin-bottom: 80rpx;
}

.question-number {
  display: block;
  font-size: 24rpx;
  color: var(--accent-green);
  font-family: var(--font-mono);
  margin-bottom: 24rpx;
}

.question-text {
  font-size: 40rpx;
  font-weight: 600;
  line-height: 1.6;
  color: var(--text-primary);
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.option-item {
  display: flex;
  align-items: baseline;
  padding: 32rpx;
  border: 1rpx solid #333;
  transition: border-color 0.2s;
}

.option-item:active {
  border-color: var(--accent-green);
}

.option-marker {
  font-size: 28rpx;
  color: var(--accent-green);
  font-family: var(--font-mono);
  margin-right: 16rpx;
  flex-shrink: 0;
}

.option-label {
  font-size: 30rpx;
  color: var(--text-primary);
  line-height: 1.5;
}
```

- [ ] **Step 5: Commit**

```bash
git add miniprogram/pages/test/
git commit -m "feat: add 7-question quiz flow with progress bar"
```

---

### Task 5: Result page with share card

**Files:**
- Create: `miniprogram/pages/result/result.js`
- Create: `miniprogram/pages/result/result.json`
- Create: `miniprogram/pages/result/result.wxml`
- Create: `miniprogram/pages/result/result.wxss`

- [ ] **Step 1: Create result.json**

```json
{
  "usingComponents": {},
  "navigationBarTitleText": "诊断完成"
}
```

- [ ] **Step 2: Create result.js**

```javascript
const results = require('../../data/results')
const app = getApp()

Page({
  data: {
    result: null,
    shareText: ''
  },

  onLoad() {
    const typeIndex = app.globalData.typeIndex
    if (typeIndex < 0 || typeIndex >= results.length) {
      wx.redirectTo({ url: '/pages/index/index' })
      return
    }
    const result = results[typeIndex]
    this.setData({
      result,
      shareText: `我的出厂设置是「${result.name}」\n\n${result.diagnosis}\n\n测测你的Bug →`
    })
  },

  onRetake() {
    app.globalData.answers = []
    app.globalData.typeIndex = -1
    wx.redirectTo({ url: '/pages/index/index' })
  },

  onShareToChat() {
    // Trigger share sheet (private chat)
    wx.showShareMenu({
      withShareTicket: false,
      menus: ['shareAppMessage']
    })
  },

  onShareAppMessage() {
    return {
      title: `我的出厂设置是「${this.data.result.name}」。测测你的Bug是什么？`,
      path: '/pages/index/index',
      imageUrl: '' // WeChat auto-generates screenshot
    }
  }
})
```

- [ ] **Step 3: Create result.wxml**

```xml
<view class="container" wx:if="{{result}}">
  <!-- Result card -->
  <view class="result-card" style="border-color: {{result.color}}">
    <!-- Type badge -->
    <view class="type-badge" style="background: {{result.color}}">
      <text class="badge-label">出厂设置</text>
      <text class="badge-code">BMTI v1.0</text>
    </view>

    <!-- Personality name -->
    <text class="type-name" style="color: {{result.color}}">{{result.name}}</text>

    <!-- Divider -->
    <view class="divider" style="background: {{result.color}}"></view>

    <!-- System diagnosis -->
    <view class="diagnosis-block">
      <text class="diagnosis-label">>>> 系统诊断报告</text>
      <text class="diagnosis-text">{{result.diagnosis}}</text>
    </view>

    <!-- Tagline -->
    <view class="tagline-block">
      <text class="tagline-text">{{result.tagline}}</text>
    </view>
  </view>

  <!-- RGBTI color swatch (visual skin) -->
  <view class="color-swatch">
    <view class="swatch-bar" style="background: {{result.color}}"></view>
    <text class="swatch-label">你的色号 {{result.color}}</text>
  </view>

  <!-- Actions -->
  <view class="actions">
    <button class="btn-share" open-type="share" style="border-color: {{result.color}}; color: {{result.color}}">
      <text>发给懂你Bug的人</text>
    </button>

    <view class="btn-retake" bindtap="onRetake">
      <text>重新诊断</text>
    </view>
  </view>

  <view class="footer-note">
    <text>长按截图保存你的出厂设置报告</text>
  </view>
</view>
```

- [ ] **Step 4: Create result.wxss**

```css
.container {
  min-height: 100vh;
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.result-card {
  width: 100%;
  border: 2rpx solid;
  padding: 48rpx 40rpx;
  margin-bottom: 40rpx;
}

.type-badge {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 8rpx 24rpx;
  margin-bottom: 32rpx;
}

.badge-label {
  font-size: 20rpx;
  color: #000;
  font-family: var(--font-mono);
}

.badge-code {
  font-size: 16rpx;
  color: #000;
  font-family: var(--font-mono);
  opacity: 0.7;
}

.type-name {
  font-size: 48rpx;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 32rpx;
}

.divider {
  height: 2rpx;
  width: 100%;
  margin-bottom: 32rpx;
}

.diagnosis-block {
  margin-bottom: 24rpx;
}

.diagnosis-label {
  display: block;
  font-size: 20rpx;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  margin-bottom: 16rpx;
}

.diagnosis-text {
  font-size: 28rpx;
  color: var(--text-primary);
  line-height: 1.8;
}

.tagline-block {
  padding-top: 24rpx;
  border-top: 1rpx solid #333;
}

.tagline-text {
  font-size: 24rpx;
  color: var(--text-secondary);
  font-style: italic;
}

.color-swatch {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 60rpx;
}

.swatch-bar {
  width: 80rpx;
  height: 24rpx;
}

.swatch-label {
  font-size: 22rpx;
  color: var(--text-secondary);
  font-family: var(--font-mono);
}

.actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-bottom: 40rpx;
}

.btn-share {
  width: 100%;
  padding: 28rpx 0;
  background: transparent;
  border: 2rpx solid;
  border-radius: 0;
  font-size: 32rpx;
  font-family: var(--font-mono);
  font-weight: 600;
}

.btn-retake {
  text-align: center;
  padding: 20rpx 0;
  font-size: 24rpx;
  color: var(--text-secondary);
}

.footer-note {
  font-size: 20rpx;
  color: var(--text-secondary);
  opacity: 0.5;
}
```

- [ ] **Step 5: Commit**

```bash
git add miniprogram/pages/result/
git commit -m "feat: add result page with share card and RGBTI color swatch"
```

---

### Task 6: Final polish and verification

- [ ] **Step 1: Verify all pages are registered in app.json**

Confirm `miniprogram/app.json` lists all three pages:
```json
{
  "pages": [
    "pages/index/index",
    "pages/test/test",
    "pages/result/result"
  ]
}
```

- [ ] **Step 2: Verify app.js globalData is initialized correctly**

Read `miniprogram/app.js` and confirm it has `answers` (array) and `typeIndex` (number) in globalData.

- [ ] **Step 3: Verify calculator.js edge case**

Read `miniprogram/utils/calculator.js` and confirm `calculateType` handles the case where a dimension has 0 questions (division by zero guard). Add a guard if needed:

```javascript
const d0 = dimCounts[0] > 0 ? (dimSums[0] / dimCounts[0] >= 0.5 ? 1 : 0) : 0
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: final polish, edge case guard in calculator"
```

---

## What's NOT in this MVP

Per the product spec:
- No login/authentication
- No cloud storage / cloud functions
- No community/social features
- No RGBTI standalone test (color card is embedded in result only)
- No multiple share copy styles (single preset copy)
- No analytics/tracking

## Testing the Demo

1. Install [WeChat Developer Tools](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. Open the tool, select "Import Project", choose `F:\Jarvis`
3. Use "Tourist Mode" (游客模式) or enter your AppID
4. Click "Compile" to preview the mini-program in the simulator
5. Test flow: Landing → Answer 7 questions → View result → Share

## Notes for Content Iteration

- All question text lives in `miniprogram/data/questions.js` — edit directly, no code changes needed
- All 16 personality types live in `miniprogram/data/results.js` — edit names, diagnoses, taglines, colors
- Question-to-dimension mapping is embedded in each option's `dim` and `value` fields
- To add/remove questions: edit the `questions` array; the calculator handles any count per dimension
