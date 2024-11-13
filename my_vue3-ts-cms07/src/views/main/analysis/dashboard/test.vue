<template>
  <div class="world-map-container">
    <!-- 地图盒子 -->
    <div class="map-box">
      <WorldChart />
    </div>
    <!-- 地图信息盒子 -->
    <div class="map-info-box">
      <span class="info-item normal">Normal: 2000</span>
      <span class="info-item abnormal">Abnormal: 12</span>
      <span class="info-item offline">Offline: 9</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入 WorldChart 组件
import WorldChart from './WorldChart.vue';
</script>

<style scoped>
/* 父容器，垂直居中对齐 */
.world-map-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 40px;
}

/* 地图盒子样式 */
.map-box {
  width: 824px;
  height: 459px;
  background-color: #0d1d30; /* 背景颜色，可根据需要调整 */
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #B9E8FF;
}

/* 地图信息盒子样式 */
.map-info-box {
  width: 528px;
  height: 31px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(13, 29, 48, 0.8);
  border: 1px solid #B9E8FF;
  border-radius: 5px;
  color: #FFFFFF;
  font-family: Arial, sans-serif;
}

/* 信息项样式 */
.info-item {
  font-size: 16px;
  font-weight: bold;
}

.normal {
  color: #00A72F; /* 正常状态的颜色 */
}

.abnormal {
  color: #F50101; /* 异常状态的颜色 */
}

.offline {
  color: #FFD700; /* 离线状态的颜色 */
}
</style>
