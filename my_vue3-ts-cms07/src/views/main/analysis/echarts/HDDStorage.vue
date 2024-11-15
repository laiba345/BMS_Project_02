<!-- src/components/HDDStorage.vue -->
<template>
  <div class="HDDStorage">
    <span class="title">HDD Storage</span>
    <div class="gauge-container">
      <GaugeChart v-for="(item, index) in gauges" :key="index" />
    </div>
  </div>
</template>

<script setup lang="ts">
import GaugeChart from './GaugeChart.vue'

const gauges = [1, 2, 3, 4, 5] 
</script>

<style scoped>

.HDDStorage {
  background-color: rgb(7, 106, 235, 0.1);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 260px; 
}

.title {
  height: 20px; 
  line-height: 20px; 
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center; 
  font-size: 14px; 
  font-weight: 700; 
}

.gauge-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* 三列布局 */
  grid-template-rows: 1fr 1fr; /* 两行布局 */
  gap: 0px;
  width: 100%;
  height: 240px;
  align-items: center;
  justify-items: center;
}

.gauge-container > * {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}

.gauge-container > *:nth-child(1) {
  grid-row: 1; /* 第一行左侧 */
  grid-column: 1;
}

.gauge-container > *:nth-child(2) {
  grid-row: 1; /* 第一行中间 */
  grid-column: 2;
}

.gauge-container > *:nth-child(3) {
  grid-row: 1; /* 第一行右侧 */
  grid-column: 3;
}

.gauge-container > *:nth-child(4) {
  grid-row: 2; /* 第二行左侧 */
  grid-column: 1 / span 2; /* 跨越左侧和中间 */
}

.gauge-container > *:nth-child(5) {
  grid-row: 2; /* 第二行右侧 */
  grid-column: 2 / span 2; /* 跨越中间和右侧 */
}
</style>




