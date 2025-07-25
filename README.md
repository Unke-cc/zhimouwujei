# Unke 产品官网

一个现代化、响应式的产品官网雏形，采用纯HTML、CSS和JavaScript构建。

## 🚀 特性

- **响应式设计** - 完美适配桌面端、平板和移动设备
- **现代化UI** - 采用渐变色彩和流畅动画效果
- **平滑滚动** - 优雅的页面内导航体验
- **交互动画** - 滚动触发的淡入动画效果
- **表单验证** - 智能的客户端表单验证
- **移动端菜单** - 自适应的汉堡菜单
- **SEO友好** - 语义化HTML结构

## 📁 项目结构

```
Unke-cc.github.io/
├── index.html          # 主页面文件
├── styles.css          # 样式文件
├── script.js           # JavaScript功能文件
└── README.md           # 项目说明文档
```

## 🎨 设计特色

### 色彩方案
- **主色调**: 蓝紫渐变 (#667eea → #764ba2)
- **强调色**: 珊瑚红 (#ff6b6b)
- **背景色**: 浅灰 (#f8f9fa)
- **文字色**: 深灰 (#333)

### 页面结构
1. **导航栏** - 固定顶部，滚动时背景透明度变化
2. **英雄区域** - 全屏展示，包含主标题和CTA按钮
3. **特性展示** - 三栏网格布局，展示核心功能
4. **关于我们** - 左右分栏，文字+图片展示
5. **联系表单** - 居中表单，包含验证功能
6. **页脚** - 版权信息和社交链接

## 🛠️ 技术栈

- **HTML5** - 语义化标签，无障碍访问
- **CSS3** - Flexbox、Grid、动画、媒体查询
- **Vanilla JavaScript** - 原生JS，无依赖框架
- **响应式设计** - 移动优先的设计理念

## 📱 响应式断点

- **桌面端**: > 768px
- **平板端**: 768px - 480px
- **移动端**: < 480px

## 🚀 快速开始

1. **克隆项目**
   ```bash
   git clone https://github.com/Unke-cc/Unke-cc.github.io.git
   cd Unke-cc.github.io
   ```

2. **本地预览**
   - 直接在浏览器中打开 `index.html`
   - 或使用本地服务器（推荐）:
     ```bash
     # 使用Python
     python -m http.server 8000
     
     # 使用Node.js
     npx serve .
     
     # 使用PHP
     php -S localhost:8000
     ```

3. **访问网站**
   打开浏览器访问 `http://localhost:8000`

## ✨ 功能说明

### 导航功能
- 平滑滚动到对应页面区域
- 滚动时导航栏背景透明度变化
- 移动端自动切换为汉堡菜单

### 动画效果
- 页面加载时的淡入动画
- 滚动触发的元素显示动画
- 悬停时的卡片提升效果
- 按钮的交互反馈动画

### 表单功能
- 实时字段验证
- 邮箱格式检查
- 提交状态反馈
- 成功提示通知

## 🎯 自定义指南

### 修改品牌信息
1. 在 `index.html` 中更新公司名称和描述
2. 在 `styles.css` 中调整色彩方案
3. 替换 favicon 和 logo

### 添加新页面
1. 创建新的HTML文件
2. 在导航菜单中添加链接
3. 保持一致的样式和结构

### 集成后端
1. 修改表单的 `action` 属性
2. 更新 `script.js` 中的表单提交逻辑
3. 添加必要的CSRF保护

## 🌐 部署

### GitHub Pages
1. 推送代码到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择主分支作为源

### 其他平台
- **Netlify**: 拖拽文件夹即可部署
- **Vercel**: 连接GitHub仓库自动部署
- **传统主机**: 上传所有文件到网站根目录

## 📈 性能优化

- CSS和JS文件已分离，便于缓存
- 使用了CSS动画而非JavaScript动画
- 图片使用SVG格式，体积小且可缩放
- 代码结构清晰，便于维护和优化

## 🔧 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- 移动端浏览器

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📞 联系我们

- 邮箱: wenkai5@foxmail.com
- 网站: https://unke-cc.github.io/zhimouwujei/
- GitHub: https://github.com/Unke-cc

---

**Unke** - 创新改变未来 🚀
