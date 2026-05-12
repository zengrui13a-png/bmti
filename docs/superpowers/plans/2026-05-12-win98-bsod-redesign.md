# Win98 BSOD Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign all three pages of Bug人格 mini-program from black/green terminal aesthetic to BSOD blue background + Win98 classic window/widget style.

**Architecture:** CSS variables in app.wxss define the Win98 palette. Each page wraps its content in a centered Win98-style dialog with title bar. All buttons use 3D beveled borders. Test page switches from auto-advance to select-then-confirm interaction (minor JS change). No other JS logic changes.

**Tech Stack:** WeChat Mini Program (WXML + WXSS + JS), no new dependencies

---

## File Structure

```
Modify:
  miniprogram/app.wxss                       # CSS variables → Win98 palette
  miniprogram/pages/index/index.wxml          # Dialog layout, command-line aesthetic
  miniprogram/pages/index/index.wxss          # Win98 button, dialog styling
  miniprogram/pages/test/test.wxml            # Radio options, progress bar, step button
  miniprogram/pages/test/test.wxss            # GroupBox, radio, Win98 progress bar
  miniprogram/pages/test/test.js              # Select-then-confirm interaction (minor)
  miniprogram/pages/result/result.wxml        # Report card, diagnostic code, timestamp
  miniprogram/pages/result/result.wxss        # Report styling, Win98 dialog
```

No files created. No JS files changed except test.js (one method refactor).

---

### Task 1: Win98 CSS palette (app.wxss)

**Files:**
- Modify: `miniprogram/app.wxss`

- [ ] **Step 1: Replace CSS variables with Win98 palette**

Replace the entire contents of `miniprogram/app.wxss`:

```css
page {
  --bsod-blue: #0000AA;
  --win-gray: #C0C0C0;
  --win-title-blue: #000080;
  --win-white: #FFFFFF;
  --win-black: #000000;
  --win-shadow: #808080;
  --win-dark-shadow: #404040;
  --win-highlight: #DFDFDF;
  --win-button-face: #C0C0C0;
  --font-mono: 'Courier New', monospace;
  --font-sans: 'SimSun', 'MS Sans Serif', sans-serif;

  background-color: var(--bsod-blue);
  color: var(--win-white);
  font-family: var(--font-mono);
  min-height: 100vh;
}
```

- [ ] **Step 2: Commit**

```bash
git add miniprogram/app.wxss
git commit -m "feat: replace dark theme with Win98 BSOD CSS palette"
```

---

### Task 2: Landing page redesign

**Files:**
- Modify: `miniprogram/pages/index/index.wxml`
- Modify: `miniprogram/pages/index/index.wxss`

- [ ] **Step 1: Rewrite index.wxml**

```xml
<view class="bsod-screen">
  <!-- Win98 Dialog -->
  <view class="win-dialog">
    <!-- Title Bar -->
    <view class="win-titlebar">
      <text class="win-title-icon"></text>
      <text class="win-title-text">Bug人格 - BMTI诊断工具</text>
      <view class="win-title-btns">
        <view class="win-title-btn">_</view>
        <view class="win-title-btn">□</view>
        <view class="win-title-btn">×</view>
      </view>
    </view>

    <!-- Dialog Body -->
    <view class="win-body">
      <!-- Command line simulation -->
      <view class="cmd-block">
        <text class="cmd-prompt">C:\Users\You> bmti.exe</text>
        <text class="cmd-line">正在加载 Bug Management Type Indicator v1.0...</text>
        <text class="cmd-line cmd-ok">[OK] 诊断模块已就绪。</text>
      </view>

      <!-- Info box -->
      <view class="info-box">
        <view class="info-box-title">! 诊断信息</view>
        <view class="info-box-body">
          <text class="info-line">· 扫描项目: 7 项系统检测</text>
          <text class="info-line">· 识别范围: 16 种 Bug 模式</text>
          <text class="info-line">· 隐私保护: 本地运行，不上传数据</text>
        </view>
      </view>

      <!-- Start Button -->
      <view class="win-btn-wrap">
        <button class="win-btn win-btn-primary" bindtap="onStartTest">
          开始诊断 (S)
        </button>
        <text class="key-hint">或按 Enter 继续...</text>
      </view>
    </view>
  </view>

  <!-- BSOD bottom text -->
  <view class="bsod-footer">
    <text class="bsod-text">A problem has been detected and diagnostics will now begin...</text>
    <text class="bsod-text">Technical information: 0x000000BMTI (0xBUG001, 0xSELF002, 0xDIAG003)</text>
  </view>
</view>
```

- [ ] **Step 2: Rewrite index.wxss**

```css
.bsod-screen {
  min-height: 100vh;
  background: var(--bsod-blue);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
  box-sizing: border-box;
}

/* Win98 Dialog Window */
.win-dialog {
  width: 640rpx;
  background: var(--win-gray);
  border: 2rpx solid var(--win-white);
  border-right-color: var(--win-black);
  border-bottom-color: var(--win-black);
  box-shadow: inset 1rpx 1rpx 0 var(--win-highlight), inset -1rpx -1rpx 0 var(--win-shadow);
}

/* Title Bar */
.win-titlebar {
  display: flex;
  align-items: center;
  background: var(--win-title-blue);
  padding: 6rpx 8rpx;
  gap: 8rpx;
}

.win-title-icon {
  font-size: 24rpx;
  color: var(--win-white);
}

.win-title-text {
  flex: 1;
  font-size: 24rpx;
  font-weight: bold;
  color: var(--win-white);
  font-family: var(--font-sans);
}

.win-title-btns {
  display: flex;
  gap: 4rpx;
}

.win-title-btn {
  width: 32rpx;
  height: 28rpx;
  background: var(--win-gray);
  border: 1rpx solid var(--win-white);
  border-right-color: var(--win-black);
  border-bottom-color: var(--win-black);
  font-size: 18rpx;
  text-align: center;
  line-height: 28rpx;
  color: var(--win-black);
  font-family: var(--font-sans);
}

/* Dialog Body */
.win-body {
  padding: 24rpx;
  color: var(--win-black);
  font-family: var(--font-sans);
}

/* Command Line Block */
.cmd-block {
  margin-bottom: 24rpx;
  background: var(--win-black);
  padding: 16rpx;
}

.cmd-prompt {
  display: block;
  font-size: 22rpx;
  color: var(--win-white);
  font-family: var(--font-mono);
  margin-bottom: 4rpx;
}

.cmd-line {
  display: block;
  font-size: 20rpx;
  color: #C0C0C0;
  font-family: var(--font-mono);
}

.cmd-ok {
  color: #00FF00;
}

/* Info Box (GroupBox style) */
.info-box {
  border: 2rpx solid var(--win-shadow);
  border-right-color: var(--win-white);
  border-bottom-color: var(--win-white);
  margin-bottom: 24rpx;
  position: relative;
  padding-top: 20rpx;
}

.info-box-title {
  position: absolute;
  top: -14rpx;
  left: 16rpx;
  background: var(--win-gray);
  padding: 0 8rpx;
  font-size: 22rpx;
  font-weight: bold;
  color: var(--win-black);
  font-family: var(--font-sans);
}

.info-box-body {
  padding: 16rpx;
}

.info-line {
  display: block;
  font-size: 22rpx;
  color: var(--win-black);
  font-family: var(--font-sans);
  line-height: 1.8;
}

/* Win98 Buttons */
.win-btn-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
}

.win-btn {
  padding: 12rpx 48rpx;
  font-size: 28rpx;
  font-family: var(--font-sans);
  border: 2rpx solid;
  border-top-color: var(--win-white);
  border-left-color: var(--win-white);
  border-right-color: var(--win-black);
  border-bottom-color: var(--win-black);
  background: var(--win-gray);
  color: var(--win-black);
  outline: 1rpx solid var(--win-shadow);
  outline-offset: -2rpx;
  border-radius: 0;
}

.win-btn:active {
  border-top-color: var(--win-black);
  border-left-color: var(--win-black);
  border-right-color: var(--win-white);
  border-bottom-color: var(--win-white);
}

.win-btn-primary {
  font-weight: bold;
  min-width: 280rpx;
}

.key-hint {
  font-size: 20rpx;
  color: var(--win-dark-shadow);
  font-family: var(--font-mono);
}

.win-body .key-hint {
  color: var(--win-dark-shadow);
}

/* BSOD Footer */
.bsod-footer {
  margin-top: 40rpx;
  text-align: center;
  padding: 0 20rpx;
}

.bsod-text {
  display: block;
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.5);
  font-family: var(--font-mono);
  line-height: 1.8;
}
```

- [ ] **Step 3: Commit**

```bash
git add miniprogram/pages/index/
git commit -m "feat: redesign landing page with Win98 dialog + BSOD aesthetic"
```

---

### Task 3: Test page redesign

**Files:**
- Modify: `miniprogram/pages/test/test.wxml`
- Modify: `miniprogram/pages/test/test.wxss`
- Modify: `miniprogram/pages/test/test.js`

- [ ] **Step 1: Update test.js for select-then-confirm interaction**

Replace the `onSelectOption` method and add `selectedIndex` to data. The full file:

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
    answers: [],
    selectedIndex: -1,
    selecting: false
  },

  onLoad() {
    this.setData({
      totalQuestions: questions.length,
      question: questions[0],
      progress: 0
    })
  },

  onShow() {
    this.data.selecting = false
  },

  onSelectOption(e) {
    if (this.data.selecting) return
    const optionIndex = e.currentTarget.dataset.index
    this.setData({ selectedIndex: optionIndex })
  },

  onNextStep() {
    if (this.data.selecting) return
    if (this.data.selectedIndex < 0) return
    if (!this.data.question) return
    this.data.selecting = true

    const selectedOption = this.data.question.options[this.data.selectedIndex]
    const answers = [...this.data.answers, selectedOption]
    const nextIndex = this.data.currentIndex + 1

    if (nextIndex >= questions.length) {
      app.globalData.answers = answers
      app.globalData.typeIndex = calculateType(answers)
      wx.redirectTo({ url: '/pages/result/result' })
    } else {
      this.setData({
        currentIndex: nextIndex,
        question: questions[nextIndex],
        progress: Math.round((nextIndex / questions.length) * 100),
        answers,
        selectedIndex: -1
      })
      this.data.selecting = false
    }
  }
})
```

- [ ] **Step 2: Rewrite test.wxml**

```xml
<view class="bsod-screen">
  <view class="win-dialog">
    <!-- Title Bar -->
    <view class="win-titlebar">
      <text class="win-title-text">系统诊断中...</text>
      <view class="win-title-btns">
        <view class="win-title-btn">_</view>
        <view class="win-title-btn">□</view>
        <view class="win-title-btn">×</view>
      </view>
    </view>

    <!-- Dialog Body -->
    <view class="win-body">
      <!-- Progress -->
      <view class="scan-info">
        <text class="scan-label">正在扫描扇区:</text>
        <text class="scan-pct">{{progress}}%</text>
      </view>
      <view class="progress-bar-wrap">
        <view class="progress-bar-fill" style="width: {{progress}}%"></view>
        <view class="progress-bar-bg"></view>
      </view>

      <!-- Question GroupBox -->
      <view class="question-group" wx:if="{{question}}">
        <view class="group-title">[ Q{{currentIndex + 1}} ]</view>
        <text class="question-text">{{question.text}}</text>
      </view>

      <!-- Options with radio buttons -->
      <view class="options-list">
        <view
          class="option-item {{selectedIndex === index ? 'option-selected' : ''}}"
          wx:for="{{question.options}}"
          wx:key="index"
          data-index="{{index}}"
          bindtap="onSelectOption"
        >
          <text class="option-radio">{{selectedIndex === index ? '●' : '○'}}</text>
          <text class="option-label">{{item.label}}</text>
        </view>
      </view>

      <!-- Next Step Button -->
      <view class="win-btn-wrap">
        <button
          class="win-btn win-btn-primary {{selectedIndex < 0 ? 'btn-disabled' : ''}}"
          bindtap="onNextStep"
          disabled="{{selectedIndex < 0}}"
        >
          {{currentIndex + 1 >= totalQuestions ? '完成诊断' : '下一步 (Enter)'}}
        </button>
      </view>
    </view>
  </view>

  <!-- BSOD Footer -->
  <view class="bsod-footer">
    <text class="bsod-text">Scanning system sectors... {{progress}}%</text>
  </view>
</view>
```

- [ ] **Step 3: Rewrite test.wxss**

```css
.bsod-screen {
  min-height: 100vh;
  background: var(--bsod-blue);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
  box-sizing: border-box;
}

.win-dialog {
  width: 640rpx;
  background: var(--win-gray);
  border: 2rpx solid var(--win-white);
  border-right-color: var(--win-black);
  border-bottom-color: var(--win-black);
  box-shadow: inset 1rpx 1rpx 0 var(--win-highlight), inset -1rpx -1rpx 0 var(--win-shadow);
}

.win-titlebar {
  display: flex;
  align-items: center;
  background: var(--win-title-blue);
  padding: 6rpx 8rpx;
}

.win-title-text {
  flex: 1;
  font-size: 24rpx;
  font-weight: bold;
  color: var(--win-white);
  font-family: var(--font-sans);
}

.win-title-btns {
  display: flex;
  gap: 4rpx;
}

.win-title-btn {
  width: 32rpx;
  height: 28rpx;
  background: var(--win-gray);
  border: 1rpx solid var(--win-white);
  border-right-color: var(--win-black);
  border-bottom-color: var(--win-black);
  font-size: 18rpx;
  text-align: center;
  line-height: 28rpx;
  color: var(--win-black);
  font-family: var(--font-sans);
}

.win-body {
  padding: 24rpx;
  color: var(--win-black);
  font-family: var(--font-sans);
}

/* Scan Info */
.scan-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8rpx;
}

.scan-label {
  font-size: 22rpx;
  color: var(--win-black);
  font-family: var(--font-sans);
}

.scan-pct {
  font-size: 22rpx;
  font-weight: bold;
  color: var(--win-title-blue);
  font-family: var(--font-mono);
}

/* Win98 Progress Bar */
.progress-bar-wrap {
  position: relative;
  height: 32rpx;
  margin-bottom: 32rpx;
}

.progress-bar-bg {
  width: 100%;
  height: 100%;
  background: var(--win-white);
  border: 1rpx solid var(--win-shadow);
  border-right-color: var(--win-white);
  border-bottom-color: var(--win-white);
  box-shadow: inset 1rpx 1rpx var(--win-dark-shadow);
}

.progress-bar-fill {
  position: absolute;
  top: 2rpx;
  left: 2rpx;
  bottom: 2rpx;
  background: var(--win-title-blue);
  transition: width 0.3s ease;
  z-index: 1;
}

/* Question GroupBox */
.question-group {
  border: 2rpx solid var(--win-shadow);
  border-right-color: var(--win-white);
  border-bottom-color: var(--win-white);
  margin-bottom: 24rpx;
  padding: 24rpx 16rpx 16rpx;
  position: relative;
}

.group-title {
  position: absolute;
  top: -14rpx;
  left: 16rpx;
  background: var(--win-gray);
  padding: 0 8rpx;
  font-size: 22rpx;
  font-weight: bold;
  color: var(--win-title-blue);
  font-family: var(--font-mono);
}

.question-text {
  font-size: 30rpx;
  color: var(--win-black);
  font-family: var(--font-sans);
  font-weight: bold;
  line-height: 1.5;
}

/* Radio Options */
.options-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-bottom: 32rpx;
}

.option-item {
  display: flex;
  align-items: center;
  padding: 20rpx 16rpx;
  background: var(--win-white);
  border: 1rpx solid var(--win-shadow);
  border-right-color: var(--win-highlight);
  border-bottom-color: var(--win-highlight);
}

.option-selected {
  background: var(--win-title-blue);
  border-color: var(--win-white);
}

.option-selected .option-radio,
.option-selected .option-label {
  color: var(--win-white);
}

.option-radio {
  font-size: 32rpx;
  color: var(--win-black);
  margin-right: 16rpx;
  flex-shrink: 0;
}

.option-label {
  font-size: 26rpx;
  color: var(--win-black);
  font-family: var(--font-sans);
  line-height: 1.4;
}

/* Buttons */
.win-btn-wrap {
  display: flex;
  justify-content: center;
}

.win-btn {
  padding: 12rpx 48rpx;
  font-size: 28rpx;
  font-family: var(--font-sans);
  border: 2rpx solid;
  border-top-color: var(--win-white);
  border-left-color: var(--win-white);
  border-right-color: var(--win-black);
  border-bottom-color: var(--win-black);
  background: var(--win-gray);
  color: var(--win-black);
  outline: 1rpx solid var(--win-shadow);
  outline-offset: -2rpx;
  border-radius: 0;
}

.win-btn:active {
  border-top-color: var(--win-black);
  border-left-color: var(--win-black);
  border-right-color: var(--win-white);
  border-bottom-color: var(--win-white);
}

.win-btn-primary {
  font-weight: bold;
  min-width: 280rpx;
}

.btn-disabled {
  color: var(--win-shadow);
}

/* BSOD Footer */
.bsod-footer {
  margin-top: 40rpx;
  text-align: center;
}

.bsod-text {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.5);
  font-family: var(--font-mono);
}
```

- [ ] **Step 4: Commit**

```bash
git add miniprogram/pages/test/
git commit -m "feat: redesign test page with Win98 radio buttons and progress bar"
```

---

### Task 4: Result page redesign

**Files:**
- Modify: `miniprogram/pages/result/result.wxml`
- Modify: `miniprogram/pages/result/result.wxss`

- [ ] **Step 1: Rewrite result.wxml**

```xml
<view class="bsod-screen" wx:if="{{result}}">
  <view class="win-dialog">
    <!-- Title Bar -->
    <view class="win-titlebar">
      <text class="win-title-text">诊断报告</text>
      <view class="win-title-btns">
        <view class="win-title-btn">_</view>
        <view class="win-title-btn">□</view>
        <view class="win-title-btn">×</view>
      </view>
    </view>

    <!-- Dialog Body -->
    <view class="win-body">
      <!-- Report Card -->
      <view class="report-card">
        <!-- Header -->
        <view class="report-header">
          <text class="report-title">BMTI 系统诊断报告 v1.0</text>
          <view class="report-divider"></view>
        </view>

        <!-- Model Info -->
        <view class="report-section">
          <text class="section-prompt">></text>
          <text class="section-label">型号识别</text>
        </view>
        <text class="model-name" style="color: {{result.color}}">{{result.name}}</text>
        <view class="color-swatch">
          <view class="swatch-block" style="background: {{result.color}}"></view>
          <text class="swatch-hex">色号: {{result.color}}</text>
        </view>

        <!-- Diagnosis -->
        <view class="report-section">
          <text class="section-prompt">></text>
          <text class="section-label">系统诊断</text>
        </view>
        <text class="diagnosis-text">{{result.diagnosis}}</text>

        <!-- Known Bug -->
        <view class="report-section">
          <text class="section-prompt">></text>
          <text class="section-label">已知Bug</text>
        </view>
        <text class="tagline-text">{{result.tagline}}</text>

        <!-- Footer Info -->
        <view class="report-divider"></view>
        <view class="report-footer">
          <text class="footer-code">Diagnostic Code: 0x{{result.id < 16 ? '000000' + (result.id < 10 ? '0' : '') : ''}}{{result.id}}</text>
          <text class="footer-time">Scan completed at:</text>
          <text class="footer-time">2026-05-12 11:23:49</text>
        </view>
      </view>

      <!-- Share Button -->
      <view class="win-btn-wrap">
        <button class="win-btn win-btn-primary" open-type="share" style="border-color: {{result.color}}">
          发送给懂你Bug的人 (Alt+S)
        </button>
      </view>

      <!-- Retake -->
      <view class="retake-link" bindtap="onRetake">
        <text class="retake-text">[ 重新扫描 (F5) ]</text>
      </view>
    </view>
  </view>

  <!-- BSOD Footer -->
  <view class="bsod-footer">
    <text class="bsod-text">Report generated. Press Alt+S to share diagnostic results.</text>
  </view>
</view>
```

- [ ] **Step 2: Rewrite result.wxss**

```css
.bsod-screen {
  min-height: 100vh;
  background: var(--bsod-blue);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
  box-sizing: border-box;
}

.win-dialog {
  width: 640rpx;
  max-height: 90vh;
  background: var(--win-gray);
  border: 2rpx solid var(--win-white);
  border-right-color: var(--win-black);
  border-bottom-color: var(--win-black);
  box-shadow: inset 1rpx 1rpx 0 var(--win-highlight), inset -1rpx -1rpx 0 var(--win-shadow);
}

.win-titlebar {
  display: flex;
  align-items: center;
  background: var(--win-title-blue);
  padding: 6rpx 8rpx;
}

.win-title-text {
  flex: 1;
  font-size: 24rpx;
  font-weight: bold;
  color: var(--win-white);
  font-family: var(--font-sans);
}

.win-title-btns {
  display: flex;
  gap: 4rpx;
}

.win-title-btn {
  width: 32rpx;
  height: 28rpx;
  background: var(--win-gray);
  border: 1rpx solid var(--win-white);
  border-right-color: var(--win-black);
  border-bottom-color: var(--win-black);
  font-size: 18rpx;
  text-align: center;
  line-height: 28rpx;
  color: var(--win-black);
  font-family: var(--font-sans);
}

.win-body {
  padding: 24rpx;
  color: var(--win-black);
  font-family: var(--font-sans);
  max-height: 60vh;
  overflow-y: auto;
}

/* Report Card */
.report-card {
  background: var(--win-white);
  border: 1rpx solid var(--win-shadow);
  border-right-color: var(--win-highlight);
  border-bottom-color: var(--win-highlight);
  padding: 24rpx;
  margin-bottom: 24rpx;
}

.report-header {
  margin-bottom: 16rpx;
}

.report-title {
  font-size: 22rpx;
  font-weight: bold;
  color: var(--win-title-blue);
  font-family: var(--font-mono);
}

.report-divider {
  height: 1rpx;
  background: var(--win-shadow);
  margin: 12rpx 0;
}

.report-section {
  display: flex;
  align-items: baseline;
  gap: 8rpx;
  margin-bottom: 8rpx;
  margin-top: 16rpx;
}

.section-prompt {
  font-size: 22rpx;
  color: var(--win-title-blue);
  font-family: var(--font-mono);
  font-weight: bold;
}

.section-label {
  font-size: 22rpx;
  font-weight: bold;
  color: var(--win-black);
  font-family: var(--font-sans);
}

.model-name {
  font-size: 36rpx;
  font-weight: bold;
  font-family: var(--font-sans);
  margin-bottom: 8rpx;
}

.color-swatch {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 8rpx;
}

.swatch-block {
  width: 40rpx;
  height: 24rpx;
  border: 1rpx solid var(--win-shadow);
}

.swatch-hex {
  font-size: 20rpx;
  color: var(--win-dark-shadow);
  font-family: var(--font-mono);
}

.diagnosis-text {
  font-size: 26rpx;
  color: var(--win-black);
  font-family: var(--font-sans);
  line-height: 1.7;
}

.tagline-text {
  font-size: 24rpx;
  color: var(--win-dark-shadow);
  font-family: var(--font-sans);
  font-style: italic;
}

/* Report Footer */
.report-footer {
  margin-top: 4rpx;
}

.footer-code {
  display: block;
  font-size: 20rpx;
  color: var(--win-shadow);
  font-family: var(--font-mono);
}

.footer-time {
  display: block;
  font-size: 18rpx;
  color: var(--win-shadow);
  font-family: var(--font-mono);
}

/* Buttons */
.win-btn-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 16rpx;
}

.win-btn {
  padding: 12rpx 32rpx;
  font-size: 26rpx;
  font-family: var(--font-sans);
  border: 2rpx solid;
  border-top-color: var(--win-white);
  border-left-color: var(--win-white);
  border-right-color: var(--win-black);
  border-bottom-color: var(--win-black);
  background: var(--win-gray);
  color: var(--win-black);
  outline: 1rpx solid var(--win-shadow);
  outline-offset: -2rpx;
  border-radius: 0;
}

.win-btn:active {
  border-top-color: var(--win-black);
  border-left-color: var(--win-black);
  border-right-color: var(--win-white);
  border-bottom-color: var(--win-white);
}

.win-btn-primary {
  font-weight: bold;
  width: 100%;
}

/* Retake Link */
.retake-link {
  text-align: center;
  padding: 12rpx 0;
}

.retake-text {
  font-size: 22rpx;
  color: var(--win-title-blue);
  font-family: var(--font-mono);
  text-decoration: underline;
}

/* BSOD Footer */
.bsod-footer {
  margin-top: 32rpx;
  text-align: center;
}

.bsod-text {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.5);
  font-family: var(--font-mono);
}
```

- [ ] **Step 3: Commit**

```bash
git add miniprogram/pages/result/
git commit -m "feat: redesign result page with Win98 diagnostic report style"
```

---

### Task 5: Final consistency pass

- [ ] **Step 1: Verify all CSS variables used are defined in app.wxss**

Check that every `var(--...)` across all wxss files is defined:
- `--bsod-blue` ✓
- `--win-gray` ✓
- `--win-title-blue` ✓
- `--win-white` ✓
- `--win-black` ✓
- `--win-shadow` ✓
- `--win-dark-shadow` ✓
- `--win-highlight` ✓
- `--font-mono` ✓
- `--font-sans` ✓
- `--win-button-face` ✓

- [ ] **Step 2: Verify no old CSS variables remain**

Search for removed variable names: `--bg-primary`, `--bg-secondary`, `--text-primary`, `--text-secondary`, `--accent-green`, `--accent-pink`, `--accent-red`, `--accent-blue`. None should appear outside of app.wxss (which was fully replaced).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: final consistency pass for Win98 redesign"
```
