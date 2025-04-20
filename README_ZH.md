<div>
<h1>
gkBlog
&middot;
<img src="https://img.shields.io/website?style=flat-square&url=https%3A%2F%2Fwww.qladgk.com"/>
<img src="https://img.shields.io/github/deployments/qlAD/gkBlog/production?label=production&style=flat-square"/>
<img src="https://img.shields.io/github/commit-activity/m/qlAD/gkBlog?style=flat-square"/>
</h1>
</div>

一个用于我的个人网站和项目的 Monorepo，使用 Turborepo 和 pnpm 构建。

## 📘 [www.qladgk.com](https://www.qladgk.com)

一个包含博客、项目展示和工作信息的个人网站。

### 技术栈

- 🚀 Next.js + TypeScript
- ➰ Framer Motion
- 🍃 Tailwind CSS
- ✍ MDX

### 运行项目

首先，我建议[安装 pnpm](https://pnpm.io/installation)，因为它是此代码库中使用的包管理器。

首先 fork 代码库，然后将其克隆到本地机器：

```
git clone <your-fork>
```

导航到项目的根目录：

```
cd ./gkBlog
```

接下来，复制 `env` 文件的开发版本：

```
cp ./apps/gkBlog/env.example ./apps/gkBlog/env.local
```

现在，您已准备好 `env.local` 文件进行配置：

```
DATABASE_URL = your-database-connection-string
SALT_IP_ADDRESS = super-secret
NEXT_PUBLIC_BAIDU_TONGJI = xxxxxxxxxxxxxx
NEXT_PUBLIC_GOOGLE_ID = xxxxxxxxxxxxxx
```

对于 `DATABASE_URL`，请使用您的数据库连接字符串。我个人使用的是免费版的 [MongoDB](https://www.mongodb.com/)，你也可以在免费版中创建数据库，并在 `env.local` 中添加连接字符串。

至于 `SALT_IP_ADDRESS`，你可以随意填写一些你的密码。它的作用是作为哈希用户 IP 地址的盐值。

配置完成后，仍然在项目根目录下安装所需的依赖项：

```
pnpm install
```

最后，运行项目：

```
pnpm dev
```

现在，你的项目应该已经启动并顺利运行了！