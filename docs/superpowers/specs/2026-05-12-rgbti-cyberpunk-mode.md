# RGBTI 色卡模式 + 赛博朋克结果卡片

## 新流程
BMTI 7 题 → XP 结果 → [开启色卡模式] → 4 道 RGBTI 题 → 赛博朋克结果卡片 + RGBA 背景

## 赛博朋克视觉规范
- 卡片：暗底 `#0D1117` + `rgba(255,255,255,0.04)`，边框霓虹发光匹配 RGBA 色
- 字体：等宽 mono，荧光色标题
- 扫光线：全卡片对角线 1px 半透白线条（CSS 动画）
- 角落：斜切角装饰
- 按钮：霓虹描边 + 外发光 box-shadow
- 背景：三层叠加（基色 + 高光 + 射线）

## 4 道 RGBTI 题目
- Q1 R·燃料: 暗火(R=120) | 晨焰(R=235)
- Q2 G·生长: 苔(G=80) | 藤(G=195)
- Q3 B·边界: 冰(B=195) | 雾(B=110)
- Q4 T·透明度: 毛玻璃(T=0.20) | 清水(T=0.80)

## 新文件
- data/color-questions.js
- pages/color-test/* (4 files)
- pages/color-result/* (4 files)

## 修改文件
- app.json (注册新页面)
- result.js (切换按钮 → 导航到 color-test)
