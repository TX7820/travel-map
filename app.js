const map = L.map('map', {
  center: [30, 0],
  zoom: 3,
  minZoom: 2,
  worldCopyJump: true, // 开启左右无缝循环
  
  // ❗关键修改：限制上下边界，放开左右边界
  maxBounds: [
    [-90, -2000], // 左下角：纬度限制在南极 (-90)，经度放开
    [90, 2000]    // 右上角：纬度限制在北极 (90)，经度放开
  ],
  maxBoundsViscosity: 1.0 // 边界粘性设为1.0（像一堵硬墙，完全拖不出去）
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// 创建一个图层专门用来放 Marker，方便我们在删除时一键清空重绘
let markersLayer = L.layerGroup().addTo(map);

// 从本地读取数据
let places = JSON.parse(localStorage.getItem('places')) || [];

// 核心功能：统一渲染地图 Marker 和 侧边栏列表
function renderPlaces() {
  // 1. 清空现有的地图图钉和列表 HTML
  markersLayer.clearLayers();
  const placeList = document.getElementById('placeList');
  placeList.innerHTML = '';

  // 2. 遍历数据重新生成
  places.forEach((p, index) => {
    // 渲染地图 Marker
    L.marker([p.lat, p.lon]).addTo(markersLayer).bindPopup(p.name);

    // 渲染侧边栏列表项
    const li = document.createElement('li');
    
    // 提取较短的名称（Nominatim 的 display_name 通常很长，取逗号前的第一部分）
    const shortName = p.name.split(',')[0]; 

    li.innerHTML = `
      <div class="place-info" title="${p.name}">
        <span class="place-name">${shortName}</span>
      </div>
      <button class="delete-btn" onclick="deletePlace(${index})" title="Delete this place">×</button>
    `;

    // 给地点名称区域绑定点击事件：点击列表项，地图视角飞跃到该地点
    li.querySelector('.place-info').addEventListener('click', () => {
      map.flyTo([p.lat, p.lon], 6, { duration: 1.5 });
    });

    placeList.appendChild(li);
  });
}

// 添加地点
function addPlace() {
  const inputElement = document.getElementById('placeInput');
  const input = inputElement.value;

  if (!input) return;

  // 调用地理编码 API
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${input}`)
    .then(res => res.json())
    .then(data => {

      if (data.length === 0) {
        alert("Location not found. Try a different name.");
        return;
      }

      const place = data[0];
      const lat = place.lat;
      const lon = place.lon;
      const name = place.display_name;

      // 保存到 localStorage
      places.push({ name, lat, lon });
      localStorage.setItem('places', JSON.stringify(places));

      // 重新渲染页面和地图
      renderPlaces();

      // 移动视角
      map.flyTo([lat, lon], 6, { duration: 1.5 });

      // 清空输入框
      inputElement.value = "";
    });
}

// 删除地点
function deletePlace(index) {
  // 从数组中移除对应的地点
  places.splice(index, 1);
  // 更新 localStorage
  localStorage.setItem('places', JSON.stringify(places));
  // 重新渲染 UI
  renderPlaces();
}

// 初始化时执行一次渲染
renderPlaces();