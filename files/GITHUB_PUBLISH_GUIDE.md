# 📤 GitHub 发布指南

详细的步骤说明，教你如何将这个项目发布到GitHub并启用GitHub Pages。

## 方法一：通过 GitHub 网页界面（最简单）

### 步骤 1：创建 GitHub 仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `yoga-gesture-app`（或你喜欢的名字）
   - **Description**: `🧘 Interactive yoga pose generator with gesture control`
   - **Public/Private**: 选择 Public（公开）
   - **不要勾选** "Initialize this repository with a README"
4. 点击 "Create repository"

### 步骤 2：上传文件

1. 在新创建的仓库页面，点击 "uploading an existing file"
2. 将以下文件拖拽到上传区域：
   - `index.html`
   - `README.md`
   - `LICENSE`
   - `.gitignore`
3. 在底部填写提交信息：
   - Commit message: `Initial commit - Yoga gesture app`
4. 点击 "Commit changes"

### 步骤 3：启用 GitHub Pages

1. 在仓库页面，点击 "Settings"（设置）
2. 在左侧菜单找到并点击 "Pages"
3. 在 "Source" 下：
   - Branch: 选择 `main`（或 `master`）
   - Folder: 选择 `/root`
4. 点击 "Save"
5. 等待几分钟，页面会显示网站地址：
   ```
   Your site is published at https://你的用户名.github.io/yoga-gesture-app/
   ```

### 步骤 4：测试访问

访问你的网站地址，享受你的瑜伽应用！🎉

---

## 方法二：通过 Git 命令行（推荐给开发者）

### 前提条件

- 已安装 [Git](https://git-scm.com/)
- 已配置 GitHub 账户和 SSH/HTTPS 认证

### 步骤 1：初始化本地仓库

在项目文件夹中打开终端：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit - Yoga gesture app"
```

### 步骤 2：连接远程仓库

在 GitHub 创建空仓库后，运行：

```bash
# 方式一：使用 HTTPS
git remote add origin https://github.com/你的用户名/yoga-gesture-app.git

# 方式二：使用 SSH（推荐）
git remote add origin git@github.com:你的用户名/yoga-gesture-app.git

# 设置默认分支为 main
git branch -M main

# 推送到 GitHub
git push -u origin main
```

### 步骤 3：启用 GitHub Pages

同方法一的步骤 3。

### 常用 Git 命令

```bash
# 查看状态
git status

# 添加新文件或修改
git add .
git commit -m "描述你的修改"
git push

# 拉取远程更新
git pull

# 查看提交历史
git log --oneline

# 创建新分支
git checkout -b feature-name
```

---

## 方法三：使用 GitHub Desktop（图形界面）

### 步骤 1：下载安装

1. 下载 [GitHub Desktop](https://desktop.github.com/)
2. 安装并登录 GitHub 账户

### 步骤 2：创建仓库

1. 点击 "File" → "Add local repository"
2. 选择项目文件夹
3. 点击 "Create repository"
4. 填写：
   - Name: `yoga-gesture-app`
   - Description: 项目描述
5. 点击 "Create Repository"

### 步骤 3：发布到 GitHub

1. 点击 "Publish repository"
2. 确认信息后点击 "Publish Repository"

### 步骤 4：启用 GitHub Pages

同方法一的步骤 3。

---

## 📋 文件清单

确保你的项目包含以下文件：

```
yoga-gesture-app/
├── index.html              # 主页面（必需）
├── README.md              # 项目说明（必需）
├── LICENSE               # 许可证（推荐）
├── .gitignore           # Git 忽略文件（推荐）
└── GITHUB_PUBLISH_GUIDE.md  # 本指南（可选）
```

---

## 🎨 自定义你的仓库

### 添加社交媒体预览卡片

1. 在仓库 Settings → General 下找到 "Social preview"
2. 上传一张 1280x640 的预览图片

### 添加主题标签

在仓库首页，点击 "Add topics" 添加：
- `yoga`
- `javascript`
- `webrtc`
- `computer-vision`
- `fitness`
- `html5`

### 添加徽章

在 README.md 中已包含一些徽章，你可以在 [shields.io](https://shields.io/) 找到更多。

---

## 🔧 故障排除

### 问题 1：GitHub Pages 显示 404

**解决方案**：
- 确认文件名是 `index.html`（小写）
- 等待 5-10 分钟，GitHub Pages 需要构建时间
- 检查 Settings → Pages 中是否正确设置了分支

### 问题 2：摄像头无法访问

**解决方案**：
- GitHub Pages 使用 HTTPS，这是访问摄像头的必要条件
- 确保浏览器允许摄像头权限
- 检查是否有其他应用正在使用摄像头

### 问题 3：推送失败

**解决方案**：
```bash
# 拉取最新代码
git pull origin main --rebase

# 再次推送
git push origin main
```

### 问题 4：文件太大无法推送

**解决方案**：
- GitHub 单文件限制 100MB
- 如果有大文件，使用 Git LFS 或移除它们

---

## 📚 进阶操作

### 设置自定义域名

1. 购买域名
2. 在域名服务商处设置 DNS：
   ```
   Type: CNAME
   Name: www
   Value: 你的用户名.github.io
   ```
3. 在仓库 Settings → Pages → Custom domain 输入域名
4. 勾选 "Enforce HTTPS"

### 自动部署工作流

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

---

## 🌟 完成后的下一步

1. ⭐ **获取 Star**：分享你的项目链接，邀请朋友给 Star
2. 📱 **社交媒体**：在 Twitter/微博等平台分享
3. 🔧 **持续改进**：根据用户反馈优化功能
4. 📖 **写博客**：分享开发过程和技术细节
5. 🤝 **参与开源**：贡献到其他类似项目

---

## 📞 需要帮助？

- GitHub 文档：https://docs.github.com/
- GitHub Pages 文档：https://pages.github.com/
- Git 教程：https://git-scm.com/book/zh/v2

祝你发布顺利！🎉
