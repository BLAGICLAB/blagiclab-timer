# Chronos · 全能计时器

带语音提醒的倒计时 / 秒表 / 时钟 PWA。

## 功能

- 倒计时（带圆环进度、整分钟语音提醒、结束音）
- 秒表（含计次）
- 本地时钟
- 常用预设：泡面 / 番茄钟 / 冥想 / 午休 ...
- 屏幕常亮（Wake Lock API）
- 离线使用（Service Worker 缓存）
- 可安装到 iOS / Android 主屏（PWA）

## 部署

任何静态托管都可以。GitHub Pages 演示：

- 源分支：`main`
- 目录：`/ (root)`
- 入口：`index.html`

## 本地运行

直接用浏览器打开 `index.html` 即可（无需后端）。

## iOS 安装步骤

1. Safari 打开 https://blagiclab.github.io/blagiclab-timer/
2. 分享 ↑ → 添加到主屏幕
3. 主屏出现"计时器"图标，点开全屏使用

## 快捷键

| 键 | 功能 |
|---|---|
| Space | 开始 / 暂停 |
| R | 重置 |
| L | 计次（秒表） |
| M | 切换模式 |
| V | 语音开关 |

## 文件

- `index.html` — 单文件应用（含全部 UI + JS）
- `manifest.webmanifest` — PWA 清单
- `sw.js` — Service Worker（离线缓存）
- `icon.svg` — 应用图标
