# Chronos · 全能计时器

带语音提醒的倒计时 / 秒表 / 时钟 PWA。

## 功能

- 倒计时（带圆环进度、整分钟语音提醒、结束音）
- 秒表（含计次）
- 时钟：本地时间 + 闹钟设置（多闹钟、增删启停、刷新后保留）+ 整点报时
- 三个模式**完全独立**：后台可同时跑（如倒计时跑着看秒表，再切回倒计时原位继续）
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

## 更新日志

### 2026-06-29 · 模式独立 + 时钟新功能 + 审计修复

**修复（用户反馈）**
- 切秒表不会再自动开始 — `state` 拆为 `sessions.timer` / `sessions.stopwatch`，三个模式互不串台
- 时钟功能从仅看时间升级为：闹钟设置 + 整点报时
- 闹钟多档可设（增删启停、5 个快捷时间、可加标签），到点响铃 + 语音播报

**新增**
- 整点报时：开关启用后每小时整点播报当前时间 + 提示音，显示“下次播报：15:00”
- 闹钟 · 5 个预设快捷：06:30 起床 / 07:30 出门 / 12:00 午饭 / 18:00 晚饭 / 22:30 睡觉

**修复（代码审计）**
- 闹钟与整点报时不再只在 clock 模式下生效（全局生效）
- 偏好设置跨刷新保留：整点报时开关、语音开关、语音提醒时机
- SVG `<linearGradient id="ring">` 重命名为 `ringGradient`（与 HTML `div#ring` ID 冲突）
- Service Worker 版本号升 v3
- 清理死代码（`digits` 变量、`cur` helper）

**测试**
- Playwright 自动化 6 场景 13 断言全过，0 console 错误
- 覆盖：模式独立 / 闹钟全局生效 / 偏好持久化 / 闹钟持久化

**提交**：`898403f · fix(timer): independent sessions, clock alarms + chime, prefs persistence`

