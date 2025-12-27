# 🧘 手势控制瑜伽生成器

一个基于Web摄像头手势识别的交互式瑜伽姿势生成器，专为初学者设计。通过简单的手势动作即可随机获取瑜伽姿势，配备倒计时和呼吸引导功能。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

## ✨ 功能特性

### 🎥 手势控制
- 通过摄像头检测手势动作
- 自动识别动作并生成随机瑜伽姿势
- 实时动作反馈显示

### 🧘 瑜伽姿势库
- 8个精选的初学者友好瑜伽姿势
- 每个姿势配有：
  - 直观的emoji图标展示
  - 详细的姿势描述
  - 健康益处说明
  - 呼吸要领指导
  - 难度等级标识

### ⏱️ 智能倒计时
- 可选择保持时间：15秒、30秒、60秒、90秒
- 开始/暂停/重置功能
- 倒计时结束自动提醒
- 美观的渐变显示界面

### 🫁 呼吸引导
- 同步呼吸提示
- "吸气"/"呼气"自动交替
- 帮助保持正确呼吸节奏

## 🚀 快速开始

### 在线体验
直接访问 GitHub Pages：[点击这里体验](https://mrfeixiang.github.io/yoga-gesture-app/)

### 本地运行

1. **克隆仓库**
```bash
git clone https://github.com/你的用户名/yoga-gesture-app.git
cd yoga-gesture-app
```

2. **打开应用**
- 直接在浏览器中打开 `yoga-gesture-countdown.html`
- 或使用本地服务器：
```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx http-server
```

3. **授予摄像头权限**
- 浏览器会请求摄像头访问权限
- 点击"允许"即可开始使用

## 📖 使用说明

### 基本操作

1. **启动摄像头**
   - 点击"启动摄像头"按钮
   - 允许浏览器访问摄像头权限

2. **生成瑜伽姿势**
   - **自动模式**：在摄像头前挥动手或移动身体
   - **手动模式**：点击"手动生成"按钮

3. **使用倒计时**
   - 选择保持时间（15/30/60/90秒）
   - 点击"开始"启动倒计时
   - 跟随呼吸引导保持姿势

### 瑜伽姿势列表

| 姿势 | 图标 | 难度 | 主要益处 |
|------|------|------|----------|
| 山式 (Tadasana) | 🧍 | 简单 | 改善姿势，增强平衡 |
| 树式 (Vrksasana) | 🌳 | 简单 | 提高平衡感，增强腿部力量 |
| 猫牛式 (Cat-Cow) | 🐱 | 非常简单 | 放松脊柱，缓解背部紧张 |
| 下犬式 (Downward Dog) | 🐕 | 中等 | 拉伸全身，增强手臂力量 |
| 婴儿式 (Child's Pose) | 👶 | 非常简单 | 放松身心，缓解压力 |
| 战士一式 (Warrior I) | ⚔️ | 中等 | 增强腿部力量，打开胸腔 |
| 桥式 (Bridge Pose) | 🌉 | 简单 | 强化核心，拉伸胸部 |
| 坐姿前屈 (Seated Forward Bend) | 🪑 | 简单 | 拉伸腿部后侧，放松背部 |

## 🛠️ 技术栈

- **前端**：纯HTML5 + CSS3 + JavaScript（无框架依赖）
- **摄像头访问**：WebRTC API (`getUserMedia`)
- **动作检测**：Canvas API 像素差异分析
- **界面设计**：渐变背景 + 毛玻璃效果

## 🔧 技术实现

### 动作检测原理
```javascript
// 通过比较连续帧之间的像素差异检测动作
1. 获取当前帧图像数据
2. 与前一帧进行像素级比较
3. 计算差异值超过阈值的像素数量
4. 超过阈值则判定为检测到动作
```

### 关键代码片段
```javascript
// 像素差异计算
for (let i = 0; i < currentFrame.data.length; i += 4) {
    const rDiff = Math.abs(currentFrame.data[i] - previousFrame.data[i]);
    const gDiff = Math.abs(currentFrame.data[i + 1] - previousFrame.data[i + 1]);
    const bDiff = Math.abs(currentFrame.data[i + 2] - previousFrame.data[i + 2]);
    
    if (rDiff + gDiff + bDiff > threshold) {
        diff++;
    }
}
```

## 📱 浏览器兼容性

| 浏览器 | 支持版本 |
|--------|----------|
| Chrome | ✅ 53+ |
| Firefox | ✅ 36+ |
| Safari | ✅ 11+ |
| Edge | ✅ 12+ |
| Opera | ✅ 40+ |

**注意**：需要HTTPS或localhost环境才能访问摄像头

## 🎯 适用场景

- 🏠 **居家健身**：在家进行简单的瑜伽练习
- 🧑‍🏫 **瑜伽教学**：作为教学辅助工具
- 💪 **工作间隙**：办公室短暂放松
- 🎓 **学习前端**：了解摄像头API和动作检测

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 开发计划

- [ ] 添加更多瑜伽姿势
- [ ] 支持姿势序列（自动切换）
- [ ] 添加语音提示功能
- [ ] 支持自定义练习时长
- [ ] 添加练习记录统计
- [ ] 支持多语言界面
- [ ] 添加姿势视频演示

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 👨‍💻 作者

**Dr. Pei**
- GitHub: [@mrfeixiang](https://github.com/mrfeixiang)

## 🙏 致谢

- 感谢所有瑜伽练习者和教练的宝贵建议
- Emoji 图标来自 Unicode 标准
- 灵感来源于对健康生活方式的追求

## 📞 联系方式

如有问题或建议，欢迎：
- 提交 [Issue](https://github.com/mrfeixiang/yoga-gesture-app/issues)
- 发送邮件至：your.email@example.com

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！

🧘‍♀️ 祝你练习愉快，身心健康！
