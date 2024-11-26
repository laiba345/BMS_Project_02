<!-- EchartsTemplate.vue -->
<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

// Props for dynamic configuration
const props = defineProps({
  title: {
    type: String,
    default: 'CPU Usage'
  },
  xAxisData: {
    type: Array,
    default: () => ['14:15', '14:35', '14:55', '15:15', '15:35', '15:55', '16:15', '16:35']
  },
  seriesData: {
    type: Array,
    default: () => []
  },
  colors: {
    type: Array,
    default: () => ['#076AEB', '#01A42F', '#FF8A48', '#FEBC22', '#FF0000']
  },
  height: {
    type: String,
    default: '280px'
  }
})

const chartRef = ref(null)
let chartInstance: any = null

const generateRandomData = () => 
  Array.from({ length: props.xAxisData.length }, () => Math.floor(Math.random() * 121))

// Chart options
const chartOptions = () => ({
  backgroundColor: 'rgb(7, 106, 235, 0.1)',
  title: {
    text: props.title,
    left: 'center',
    padding: [10, 0, 0, 0],
    textStyle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#FFFFFF'
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    bottom: '0%',
    data: props.seriesData.map((series) => series.name), // Dynamically setting legend names
    icon: 'rect',
    itemWidth: 14,
    itemHeight: 8,
    itemGap: 20,
    textStyle: {
      color: '#B9E8FF'
    }
  },
  xAxis: {
    type: 'category',
    data: props.xAxisData,
    axisTick: { show: false },
    axisLabel: { color: '#B9E8FF' },
    axisLine: { lineStyle: { color: 'rgba(185, 232, 255)' } }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 120,
    splitNumber: 5,
    axisTick: { show: false },
    axisLabel: { color: '#B9E8FF' },
    axisLine: { lineStyle: { color: 'rgb(235, 237, 238)' } },
    splitLine: { lineStyle: { type: 'dashed', color: 'rgb(235, 237, 238, 0.4)' } },
    boundaryGap: ['0%', '5%']
  },
  series: props.seriesData.map((series, index) => ({
    name: series.name,
    type: 'line',
    data: series.data || generateRandomData(),
    smooth: true,
    showSymbol: false,
    lineStyle: { color: props.colors[index] },
    itemStyle: { color: props.colors[index] }
  })),
  grid: {
    top: '12%',
    bottom: '17%',
    right: '3%',
    left: '8%'
  }
})

const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    chartInstance.setOption(chartOptions())
    window.addEventListener('resize', resizeChart)
  }
}

const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose()
  }
  window.removeEventListener('resize', resizeChart)
})

onMounted(() => {
  initChart()
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 280px;
}
</style>
