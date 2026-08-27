---
title: 另一台服务器上的 Umami 分析服务
date: 2026-08-27 10:38:00
tags:
  - 2026
---

## 另一台服务器上的 Umami 分析服务

### 用途与边界

已在另一台腾讯云 Ubuntu 服务器上自托管 Umami，用于统计 Luna Body Tracker 等项目的匿名访问情况。该服务与 StopWatch、iOS HealthKit、BLE 探针彼此独立，不参与身体数据的存储或 AI 分析。

隐私边界：

- 可以统计页面访问量、访问页面、来源、设备/浏览器类型和粗略地区。
- 不主动采集 Luna 中的心情、睡眠、饮食、体重、备注、HealthKit、IndexedDB 或 LocalStorage 内容。
- 页面 URL 和自定义事件中禁止放入健康状态、体重、症状或用户输入内容。
- 后续若添加事件，只发送 `record_created`、`export_clicked` 这类不含具体身体数据的动作名。

### 已部署架构

```text
analytics.arieslx.online
→ Caddy（80/443，自动 HTTPS）
→ Umami（Docker 内部 3000）
→ PostgreSQL 15
```

服务器目录：

```text
~/umami-stack
```

Docker 镜像：

```text
ghcr.io/umami-software/umami:latest
caddy:2.11.4-alpine
postgres:15-alpine
```

容器状态已验证：

```text
umami  healthy
db     healthy
caddy  up
```

公网入口：

```text
https://analytics.arieslx.online
```

Caddy 已成功从 Let's Encrypt 获取该域名证书。服务器侧执行 `curl -I https://analytics.arieslx.online` 返回 `HTTP/2 200`；Caddy 容器访问 `http://umami:3000` 也返回 `200 OK`，证明域名、HTTPS、反向代理和 Umami 均已打通。

注意：宿主机访问 `127.0.0.1:3000` 失败属于正常现象，因为 Umami 的 3000 端口只开放在 Docker 网络内；公网只开放 Caddy 的 80/443。不要为了测试而向公网开放 3000。

### 运维命令

```bash
cd ~/umami-stack

# 查看状态
docker compose ps

# 查看日志
docker compose logs --tail=100 umami
docker compose logs --tail=100 caddy

# 启动或应用配置
docker compose up -d
```

Caddy 配置由宿主机目录挂载：

```text
/home/ubuntu/umami-stack/caddy → /etc/caddy
```

管理员已经使用默认账号首次登录，并已修改默认密码。新密码属于私密信息，不写入 handoff、仓库或聊天中的代码块。

### Luna Body Tracker 已创建的网站

Umami 中已经创建：

```text
Name: Luna Body Tracker
Domain: luna.arieslx.online
Website ID: 98257cc5-925c-4843-9c5c-222f390306b7
```

生成的追踪脚本：

```html
<script
  defer
  src="https://analytics.arieslx.online/script.js"
  data-website-id="98257cc5-925c-4843-9c5c-222f390306b7"
></script>
```

### 尚未完成

需要将上述脚本加入 Luna Body Tracker Web 项目的 HTML `<head>` 中。若项目是 Vite/React，通常放在项目根目录 `index.html`。部署后按以下方式验证：

1. 访问 `https://luna.arieslx.online` 并切换几个页面。
2. 浏览器 Network 中确认 `https://analytics.arieslx.online/script.js` 返回 `200`。
3. 回到 Umami 的 Luna Body Tracker 仪表盘，将时间范围选择为 Today。
4. 等待约 10～30 秒确认出现访问记录。
5. 首次验证时关闭广告拦截器，避免分析脚本被浏览器扩展拦截。
