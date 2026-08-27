---
title: Luna Body Tracker 腾讯云静态部署与 GitHub CI/CD Handoff
date: 2026-08-27 10:38:00
tags:
  - 2026
  - hackathon
---

# Luna Body Tracker 腾讯云静态部署与 GitHub CI/CD Handoff

更新时间：2026-08-27  
项目仓库：`arieslx/luna-body-tracker`  
目标站点：`https://luna.arieslx.online`

## 1. 本次目标

将 Luna Body Tracker Monorepo 中的 Vite/React Web App 自动部署到一台已经备案的腾讯云 Ubuntu 服务器：

```text
合并或 push 到 main
→ GitHub Actions 安装依赖并 build
→ 生成 apps/web/dist/
→ SSH + rsync 上传腾讯云
→ Caddy 直接托管静态文件
```

不采用每次本地手动 build + upload；也不为纯静态 Web App 单独制作 Docker 镜像。

## 2. 服务器最终架构

这台腾讯云服务器同时放置两个静态网站，共用一个 Caddy 镜像和一个 Caddy 容器。这是正确设计，一个 Caddy 实例可以按域名托管多个站点。

当前容器：

```text
IMAGE: caddy:2-alpine
CONTAINER: apps-caddy-1
PORTS: 80, 443
```

域名与目录映射：

| 网站 | 公网域名 | 服务器目录 | Caddy 容器目录 |
|---|---|---|---|
| Luna Body Tracker | `luna.arieslx.online` | `/opt/apps/sites/luna` | `/srv/luna` |
| sheRuntime | `runtime.arieslx.online` | `/opt/apps/sites/runtime` | `/srv/runtime` |

Docker 实际挂载已经验证：

```text
/opt/apps/Caddyfile -> /etc/caddy/Caddyfile
/opt/apps/sites/luna -> /srv/luna
/opt/apps/sites/runtime -> /srv/runtime
Docker volume apps_caddy_data -> /data
Docker volume apps_caddy_config -> /config
```

注意：GitHub Actions 要上传到服务器路径 `/opt/apps/sites/luna/`，不能写容器内部路径 `/srv/luna/`。

## 3. 当前 Caddy 配置

文件位置：

```text
/opt/apps/Caddyfile
```

内容：

```caddyfile
luna.arieslx.online {
    encode zstd gzip
    root * /srv/luna
    try_files {path} /index.html
    file_server
}

runtime.arieslx.online {
    encode zstd gzip
    root * /srv/runtime
    try_files {path} /index.html
    file_server
}
```

`try_files {path} /index.html` 用于 SPA fallback，避免 React/Vite 子路由直接刷新时返回 404。

当前服务器目录已有占位文件：

```text
/opt/apps/sites/luna/index.html
/opt/apps/sites/runtime/index.html
```

静态文件更新后不需要重启 Caddy；Caddy 会直接读取新文件。

## 4. 已执行的服务器检查命令

### 4.1 查看运行中的容器

```bash
sudo docker ps
```

确认只有一个 Caddy 容器 `apps-caddy-1`。只有一个 Caddy 容器不妨碍托管两个网站。

### 4.2 查看 Caddy 挂载

```bash
sudo docker inspect apps-caddy-1 \
  --format '{{range .Mounts}}{{println .Source "->" .Destination}}{{end}}'
```

### 4.3 查看 Caddyfile

```bash
sudo sed -n '1,200p' /opt/apps/Caddyfile
```

### 4.4 查看当前站点文件

```bash
sudo find /opt/apps/sites -maxdepth 2 -type f
```

### 4.5 查看目录权限

```bash
sudo ls -ld \
  /opt/apps \
  /opt/apps/sites \
  /opt/apps/sites/luna \
  /opt/apps/sites/runtime

whoami
```

检查结果：

```text
/opt/apps                    ubuntu:ubuntu  755
/opt/apps/sites              ubuntu:ubuntu  775
/opt/apps/sites/luna         ubuntu:ubuntu  775
/opt/apps/sites/runtime      ubuntu:ubuntu  775
当前用户                    ubuntu
```

因此 GitHub Actions 使用 `ubuntu` 用户可以直接写入 `/opt/apps/sites/luna/`。

## 5. Monorepo 结构与构建方式

本地仓库位置：

```text
/Users/ari/Desktop/luna-body-tracker
```

关键结构：

```text
luna-body-tracker/
├─ apps/
│  ├─ web/
│  │  ├─ index.html
│  │  ├─ package.json
│  │  ├─ vite.config.ts
│  │  ├─ src/
│  │  ├─ public/
│  │  └─ dist/              # 本地构建产物，保持 Git ignore
│  └─ skill/
├─ packages/
│  ├─ schema/
│  ├─ storage/
│  ├─ import-export/
│  ├─ ui/
│  └─ ...
├─ firmware / 其他软硬件内容
├─ package.json
├─ pnpm-lock.yaml
└─ pnpm-workspace.yaml
```

包管理器：

```text
pnpm@10.12.1
```

Web workspace 包名：

```text
@luna-body-tracker/web
```

Web build 脚本：

```json
"build": "tsc -p tsconfig.json && vite build"
```

Vite 输出目录：

```text
apps/web/dist
```

本地验证命令：

```bash
cd /Users/ari/Desktop/luna-body-tracker
pnpm install --frozen-lockfile
pnpm --filter @luna-body-tracker/web build
ls -la apps/web/dist
```

`dist` 继续保留在 `.gitignore`，不需要恢复或提交。CI 会在 GitHub 临时运行环境重新生成 `apps/web/dist/`。

## 6. Umami 追踪脚本

Umami Website ID：

```text
98257cc5-925c-4843-9c5c-222f390306b7
```

追踪脚本应放在 `apps/web/index.html` 的 `<head>` 中：

```html
<script
  defer
  src="https://analytics.arieslx.online/script.js"
  data-website-id="98257cc5-925c-4843-9c5c-222f390306b7"
></script>
```

检查命令：

```bash
grep -n "analytics.arieslx.online" apps/web/index.html
```

隐私边界：只做匿名页面访问和非敏感功能事件统计，不将身体状态、体重、症状、HealthKit 内容或用户输入放入 URL、自定义事件参数或 Umami。

## 7. GitHub SSH 部署凭据

已在 Mac 创建专用部署密钥：

```text
~/.ssh/luna_github_actions       # 私钥
~/.ssh/luna_github_actions.pub   # 公钥
```

公钥已经追加到服务器：

```text
~/.ssh/authorized_keys
```

服务器权限设置命令：

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

Mac 免密登录验证命令：

```bash
ssh -i ~/.ssh/luna_github_actions ubuntu@服务器公网IP
```

结果：已经可以免密码登录，SSH 部署通道验证成功。

Luna GitHub 仓库已创建三个 Repository Actions secrets：

```text
DEPLOY_HOST      # 腾讯云公网 IP
DEPLOY_USER      # ubuntu
DEPLOY_SSH_KEY   # luna_github_actions 完整私钥
```

私钥不得提交到仓库、写入 `.env`、Handoff 或普通聊天内容。

## 8. GitHub Actions 工作流

GitHub 只识别以下复数目录名：

```text
.github/workflows/
```

工作流文件：

```text
.github/workflows/deploy-luna.yml
```

最终内容：

```yaml
name: Deploy Luna Body Tracker

on:
  push:
    branches:
      - main
    paths:
      - "apps/web/**"
      - "packages/**"
      - "package.json"
      - "pnpm-lock.yaml"
      - "pnpm-workspace.yaml"
      - "tsconfig.json"
      - "tsconfig.base.json"
      - ".github/workflows/deploy-luna.yml"
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: deploy-luna-production
  cancel-in-progress: true

jobs:
  deploy:
    name: Build and deploy
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10.12.1

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build Luna Web
        run: pnpm --filter @luna-body-tracker/web build

      - name: Configure SSH
        env:
          DEPLOY_HOST: ${{ secrets.DEPLOY_HOST }}
          DEPLOY_SSH_KEY: ${{ secrets.DEPLOY_SSH_KEY }}
        run: |
          mkdir -p ~/.ssh
          chmod 700 ~/.ssh
          printf '%s\n' "$DEPLOY_SSH_KEY" > ~/.ssh/luna_deploy
          chmod 600 ~/.ssh/luna_deploy
          ssh-keyscan -H "$DEPLOY_HOST" >> ~/.ssh/known_hosts
          chmod 600 ~/.ssh/known_hosts

      - name: Deploy static files
        env:
          DEPLOY_HOST: ${{ secrets.DEPLOY_HOST }}
          DEPLOY_USER: ${{ secrets.DEPLOY_USER }}
        run: |
          rsync -az --delete \
            -e "ssh -i ~/.ssh/luna_deploy" \
            apps/web/dist/ \
            "$DEPLOY_USER@$DEPLOY_HOST:/opt/apps/sites/luna/"
```

路径触发规则的目的：

- 修改 `apps/web/**`：部署 Luna。
- 修改 Web 使用的 `packages/**`：部署 Luna。
- 修改 workspace/lockfile/根 TypeScript 配置：部署 Luna。
- 只修改固件、iOS、文档或 `apps/skill`：不触发 Luna 部署。
- `workflow_dispatch`：允许从 GitHub Actions 页面手动运行。

`rsync --delete` 只同步并清理明确目标 `/opt/apps/sites/luna/` 内上一版本遗留的静态产物，不影响 `/opt/apps/sites/runtime/`。

## 9. 本次错误、原因与修正

### 错误 1：普通用户无权访问 Docker API

执行：

```bash
docker inspect $(docker ps -q --filter "ancestor=caddy") ...
```

出现：

```text
permission denied while trying to connect to the docker API at unix:///var/run/docker.sock
docker inspect requires at least 1 argument
```

原因：

1. `ubuntu` 当前没有直接访问 Docker socket 的权限。
2. 内层 `docker ps` 先失败，命令替换得到空字符串，所以外层 `docker inspect` 又报没有参数。

修正：先使用 `sudo docker ps` 获取准确容器名，然后对明确容器执行：

```bash
sudo docker inspect apps-caddy-1 \
  --format '{{range .Mounts}}{{println .Source "->" .Destination}}{{end}}'
```

没有为了省略 `sudo` 而修改 Docker 用户组；当前继续使用 `sudo` 即可。

### 错误 2：误以为两个网站需要两个 Caddy 镜像/容器

实际：一个 Caddy 容器可以通过多个域名配置块托管多个静态站点。当前一个 `apps-caddy-1` 同时服务 Luna 和 runtime 是正确架构。

### 错误 3：把工作流目录写成单数 `workflow`

错误路径：

```text
.github/workflow/deploy-luna.yml
```

结果：GitHub Actions 页面只显示 “Get started with GitHub Actions”，没有检测到工作流。

正确路径：

```text
.github/workflows/deploy-luna.yml
```

修正目录名并合并到 `main` 后，GitHub Actions 成功识别并自动触发：

```text
Deploy Luna Body Tracker #1
Branch: main
Status: In progress（最后一次对话观察时）
```

### 错误 4：担心 `dist` 被 ignore 会影响部署

这是正常设置。`dist` 是可重复生成的构建产物：

```text
源码进入 Git
→ GitHub Actions build
→ 临时生成 dist
→ rsync 到服务器
```

不提交：

```text
apps/web/dist/
node_modules/
.pnpm-store/
.DS_Store
```

可使用以下命令确认 ignore 规则：

```bash
git check-ignore -v apps/web/dist
```

## 10. 当前状态

已经完成并验证：

- 腾讯云上 Caddy 容器正在运行并监听 80/443。
- 两个域名分别映射到独立静态目录。
- Caddy 配置包含 SPA fallback。
- `ubuntu` 对两个网站目录拥有写权限。
- GitHub Actions 三个 Secrets 已配置。
- 独立 SSH 部署密钥可以免密码登录服务器。
- Monorepo build 入口和 `dist` 位置已确认。
- 工作流目录名已修正为 `.github/workflows/`。
- GitHub 已识别工作流并触发第一次运行。

最后已知但尚未确认：

- 第一次 `Deploy Luna Body Tracker #1` 是否最终全绿完成。
- `/opt/apps/sites/luna/` 是否已经被真实 `dist` 替换。
- `https://luna.arieslx.online` 是否呈现最新页面。
- Umami 是否收到 Luna 的首次访问。

## 11. 下一会话直接执行

先打开 GitHub：

```text
Repository → Actions → Deploy Luna Body Tracker → 最新运行 → Build and deploy
```

检查步骤：

```text
Checkout repository
Install pnpm
Set up Node.js
Install dependencies
Build Luna Web
Configure SSH
Deploy static files
```

若出现红叉，展开第一个失败步骤，复制完整错误日志继续排查。

如果全部为绿色，在服务器验证：

```bash
sudo find /opt/apps/sites/luna -maxdepth 2 -type f | head -50
```

然后访问：

```text
https://luna.arieslx.online
```

检查响应：

```bash
curl -I https://luna.arieslx.online
```

预期为 `HTTP/2 200`。最后打开 Umami 的 Luna Body Tracker 仪表盘，时间范围选择 Today，并在关闭广告拦截器的浏览器中访问 Luna，等待约 10～30 秒确认统计数据出现。
