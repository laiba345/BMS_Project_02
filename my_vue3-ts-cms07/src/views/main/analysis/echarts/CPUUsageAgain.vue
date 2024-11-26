<template>
  <div>
    <EchartsTemplate
      :title="'My Custom CPU Usage Chart'"
      :xAxisData="customXAxisData"
      :seriesData="seriesConfig"
      :colors="['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF']"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EchartsTemplate from './EchartsTemplate.vue'

// const customXAxisData = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30']

// Configure series data with dynamic names and values
const seriesConfig = [
  { name: 'Fusion 1a', data: [80, 85, 90, 88, 94, 75, 70, 80] },
  { name: 'Fusion 1b', data: [70, 60, 65, 60, 80, 75, 85, 90] },
  { name: 'DC 1a', data: [50, 55, 45, 60, 70, 65, 75, 80] },
  { name: 'DC 1b', data: [60, 50, 55, 65, 70, 60, 80, 85] },
  { name: 'Log 1a', data: [90, 88, 95, 85, 75, 70, 80, 90] }
]
</script>
