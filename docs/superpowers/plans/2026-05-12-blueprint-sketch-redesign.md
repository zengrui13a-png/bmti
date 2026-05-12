# Blueprint Sketch + Light Neon Redesign

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development

**Goal:** Redesign all pages with hand-drawn blueprint aesthetic. BMTI module: graph paper + WinXP sketch. Calibration: light cyberpunk blueprint with neon glows on pale background.

**Architecture:** Dashed borders simulate sketch lines. Subtle rotation (-0.3deg) on key containers. Blueprint grid background (repeating-linear-gradient). Cross-hatch patterns for fills. No pure black — all dark elements are deep navy #1A2332. Light backgrounds throughout (#F5F4EE / #F0EFE8).

**Tech Stack:** WeChat Mini Program WXSS (dashed borders, transform rotate, repeating-linear-gradient, box-shadow glow)

---

## Files to Modify

```
miniprogram/app.wxss                    # Blueprint palette
miniprogram/pages/index/index.wxml       # Hand-drawn landing
miniprogram/pages/index/index.wxss
miniprogram/pages/test/test.wxml         # Blueprint quiz
miniprogram/pages/test/test.wxss
miniprogram/pages/result/result.wxml     # Sketch result card
miniprogram/pages/result/result.wxss
miniprogram/pages/color-test/color-test.wxml   # Neon blueprint calibration
miniprogram/pages/color-test/color-test.wxss
miniprogram/pages/color-result/color-result.wxml  # Neon sketch report
miniprogram/pages/color-result/color-result.wxss
```

11 files. No JS changes.

---

### Task 1: Blueprint CSS palette (app.wxss)

Overwrite with hand-drawn blueprint tokens:

```css
page {
  /* Blueprint paper */
  --paper: #F5F4EE;
  --paper-warm: #F0EFE8;
  --paper-cool: #EEF0F5;
  /* Grid */
  --grid-blue: #C8D4E8;
  --grid-blue-light: #DEE6F2;
  /* Ink */
  --ink: #1A2332;
  --ink-light: #5A6880;
  --ink-faint: #9AA8BD;
  /* BSOD */
  --bsod-blue: #3355AA;
  --bsod-text: #FFFFFF;
  /* Neon accent for calibration */
  --neon-pink: #E8507A;
  --neon-red: #E04050;
  --neon-blue: #3898D0;
  --neon-green: #30B860;
  --neon-glow-pink: rgba(232,80,122,0.45);
  --neon-glow-blue: rgba(56,152,208,0.45);
  --neon-glow-green: rgba(48,184,96,0.45);
  /* Sketch */
  --sketch-border: 2rpx dashed;
  --sketch-color: #6A7888;
  --sketch-light: #B8C4D4;
  /* Fonts */
  --font-mono: 'Courier New', monospace;
  --font-sketch: 'Segoe UI', 'Tahoma', 'Microsoft YaHei', sans-serif;

  background-color: var(--paper);
  color: var(--ink);
  font-family: var(--font-sketch);
  min-height: 100vh;

  /* Blueprint grid */
  background-image:
    linear-gradient(rgba(200,212,232,0.35) 1px, transparent 1px),
    linear-gradient(90deg, rgba(200,212,232,0.35) 1px, transparent 1px);
  background-size: 24rpx 24rpx;
}
```

Commit: `feat: blueprint sketch CSS palette with graph paper grid`

---

### Task 2: Hand-drawn landing page

Rewrite index.wxml + index.wxss with:
- Graph paper background (inherited from app.wxss)
- A sketch-style "window" — dashed border, subtle rotation, corner tick marks
- WinXP-style title bar rendered as sketch (dashed outline + cross-hatch fill)
- BSOD-style blue block with hand-drawn white text inside
- Sketch-style button: dashed border + slightly tilted

Corner tick marks on the window use 4 small `<view>` elements positioned at corners with `::before`-like borders.

Commit: `feat: hand-drawn blueprint landing page`

---

### Task 3: Blueprint BMTI quiz page

Rewrite test.wxml + test.wxss:
- Progress bar: sketch-style, filled with parallel hatch lines instead of solid blue
- Question container: dashed border with blueprint annotation marks
- Module tags: monospace blueprint labels (like "CRASH_HANDLER.sys" in blueprint font)
- Options: dashed border cards, selected gets cross-hatch fill overlay
- Radio markers: hand-drawn circles ○/● using border + transform
- "下一步" button: sketch outline + hatch fill on active

Commit: `feat: blueprint sketch BMTI quiz page`

---

### Task 4: Hand-drawn result card

Rewrite result.wxml + result.wxss:
- Report card: sketch-style frame, slight rotation (-0.3deg)
- Section dividers: wavy dashed lines instead of solid
- "📋 诊断报告" label: blueprint annotation style
- Model name: ink-style bold, hand-drawn underline
- Buttons: sketch border, hatch fill on primary
- "🖥 显示校准" button: hand-drawn with corner marks

Commit: `feat: hand-drawn blueprint BMTI result card`

---

### Task 5: Light neon calibration page

Rewrite color-test.wxml + color-test.wxss:
- Light background (#F0EFE8) with subtle engineering blueprint grid
- Window panel: sketch border + neon accent glow
- Title bar: blueprint label style
- Modules: neon-colored monospace labels with soft glow
- Options: dashed border, selected gets neon border + soft background glow
- Progress: hollow track with neon fill + glow
- "确认采样" button: sketch border, neon blue fill on active
- No black anywhere — darkest element is deep navy #1A2332

Commit: `feat: light neon blueprint calibration page`

---

### Task 6: Light neon spectral report

Rewrite color-result.wxml + color-result.wxss:
- Light background with colored sketch grid (subtle tint from user's RGBA)
- Dynamic background: still uses radial gradients but on lighter base
- Card: sketch frame with neon corner accents
- Spectrum bar: cross-hatched fills instead of solid colors
- Analysis text: ink-style on paper background
- Section dividers: blueprint annotation style
- Closing block: neon-left-border highlight
- Share button: sketch border + neon glow on press

Commit: `feat: light neon blueprint spectral report`

---

### Task 7: Final integration

Verify: no old dark backgrounds, no old Win98 variables, all pages use blueprint palette.
Commit + push.
