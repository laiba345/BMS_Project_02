<!-- src/components/HDDStorage.vue -->
<template>
  <div class="gauge-container">
    <GaugeChart v-for="(item, index) in gauges" :key="index" />
  </div>
</template>

<script setup lang="ts">
import GaugeChart from './GaugeChart.vue'

const gauges = [1, 2, 3, 4, 5] // 定义5个仪表盘的索引
</script>

<style scoped>
.gauge-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* 三列布局 */
  grid-template-rows: 1fr 1fr; /* 两行布局 */
  /* gap: 10px; */
  width: 500px;
  height: 400px;
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
