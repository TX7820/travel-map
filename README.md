# 🌍 个人旅行足迹地图 (My Travel Map)

一个基于网页的轻量级、交互式旅行足迹记录工具。可以让你在世界地图上标记去过的城市或想去的目的地，自动生成你的专属旅行版图。

🔗 **[点击这里查看在线预览 (Live Demo)](https://tx7820.github.io/travel-map/)**

---

## ✨ 功能特点 (Features)

* 📍 **地点智能搜索**：内置 OpenStreetMap (Nominatim API) 地理编码，输入城市或地点名称即可自动解析经纬度并在地图上打卡。
* 🗺️ **沉浸式交互地图**：基于 Leaflet.js 构建，支持全屏拖拽、平滑缩放。点击左侧列表中的地点，地图视角会自动“飞跃”至目标位置。
* 🗑️ **地点管理**：支持一键删除已添加的足迹，地图图钉与侧边栏列表实时同步。
* 💾 **本地数据存储**：利用浏览器 `localStorage` 保存您的足迹数据，页面刷新后数据不会丢失（*注：数据仅保存在当前浏览器的本地环境中*）。
* 🎨 **现代化 UI 设计**：采用流行的毛玻璃（Glassmorphism）特效侧边栏、定制化滚动条及 `Poppins` 现代字体，界面干净美观。

---

## 🛠️ 技术栈 (Tech Stack)

* **前端结构**：HTML5, CSS3
* **交互逻辑**：原生 JavaScript (Vanilla JS)
* **地图引擎**：[Leaflet.js](https://leafletjs.com/)
* **地图瓦片与搜索 API**：OpenStreetMap (OSM) & Nominatim API

## 📂 文件结构

```text
.
├── index.html    # 网页主结构
├── style.css     # 地图全屏样式与 UI 设计
├── app.js        # 地图初始化、API 调用及数据存取逻辑
├── data.json     # (可选) 预设的地点数据结构
└── README.md     # 项目说明文档

---
## 未来会持续更新的


