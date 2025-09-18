# 使用 Node.js 18 的 Debian slim 版本作为基础镜像
FROM node:22-slim AS base

# 安装必要的系统依赖
RUN apt-get update && \
    apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/*

# 全局安装 Turbo 和 pnpm
RUN npm install -g turbo pnpm

#######################################################

# 创建安装阶段
FROM base AS installer
WORKDIR /app
COPY . .
RUN pnpm install

#######################################################

# 创建构建阶段
FROM installer AS builder
WORKDIR /app
RUN pnpm run build

#######################################################

# 创建运行阶段
FROM builder AS runner
WORKDIR /app

WORKDIR /app/apps/gkBlog

# 生成 Prisma Client
RUN pnpm exec prisma generate

# 切换到非 root 用户
RUN addgroup --system --gid 1001 web-group && \
    adduser --system --uid 1001 --home /home/web-user web-user && \
    mkdir -p /home/web-user/.local/share/pnpm && \
    chown -R web-user:web-group /home/web-user && \
    chown -R web-user:web-group /app

USER web-user
ENV HOME=/home/web-user
ENV PNPM_HOME=/home/web-user/.local/share/pnpm

# 暴露端口
EXPOSE 3000

WORKDIR /app

# 启动命令
CMD ["pnpm", "run", "start"]