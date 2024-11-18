<template>
  <div class="HDDStorage">
    <span class="title">HDD Storage</span>
    <div class="gauge-container">
      <GaugeChart v-for="(name, index) in gaugeNames" :key="index" :name="name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import GaugeChart from './GaugeChart.vue'

// 定义每个仪表盘的名字
const gaugeNames = ['Fusion 1a', 'DC 1a', 'Log 1a', 'Fusion 1a', 'DC 1a']
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
  grid-template-columns: 1fr 1fr 1fr; 
  grid-template-rows: 1fr 1fr;
  gap: 0px;
  width: 100%;
  height: 240px;
  align-items: center;
  justify-items: center;
}

.gauge-container > * {
  display: flex;
  align-items: center; 
  justify-content: center;
}

.gauge-container > *:nth-child(1) {
  grid-row: 1;
  grid-column: 1;
}

.gauge-container > *:nth-child(2) {
  grid-row: 1; 
  grid-column: 2;
}

.gauge-container > *:nth-child(3) {
  grid-row: 1;
  grid-column: 3;
}

.gauge-container > *:nth-child(4) {
  grid-row: 2;
  grid-column: 1 / span 2; 
}

.gauge-container > *:nth-child(5) {
  grid-row: 2;
  grid-column: 2 / span 2; 
}
</style>




