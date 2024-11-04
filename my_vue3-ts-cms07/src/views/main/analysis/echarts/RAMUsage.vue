<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

// 使用 ref 绑定图表的 DOM 容器
const chartRef = ref(null)
let chartInstance = null

// 横坐标数据
const xAxisData = ['14:15', '14:35', '14:55', '15:15', '15:35', '15:55', '16:15', '16:35']

// 生成随机数据函数
const generateRandomData = () => Array.from({ length: xAxisData.length }, () => Math.floor(Math.random() * 121))

// 折线图的配置项
const chartOptions = {
  title: {
    text: 'CPU Usage',
    left: 'center',
    padding: [10, 0, 0, 0], // 控制标题上下左右的间距（[上, 右, 下, 左]）
    textStyle: {
      fontSize: 18,
      fontWeight: 'bold'
    }
  },
  legend: {
    bottom: '0%',
    data: ['Fusion 1a', 'Fusion 1b', 'DC 1a', 'DC 1b', 'Log 1a'],
    icon: 'rect', // 设置图例的图标为小矩形
    itemWidth: 14, // 控制图例矩形的宽度
    itemHeight: 8  // 控制图例矩形的高度
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: xAxisData
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 120
  },
  grid: {
    top: '18%', // 调整顶部间距，缩小标题和图表的距离
    bottom: '15%' // 为图例留出空间
  },
  series: [
    {
      name: 'Fusion 1a',
      type: 'line',
      data: generateRandomData(),
      smooth: true,
      lineStyle: { color: 'rgb(7, 105, 234)' }
    },
    {
      name: 'Fusion 1b',
      type: 'line',
      data: generateRandomData(),
      smooth: true,
      lineStyle: { color: 'rgb(1, 161, 47)' }
    },
    {
      name: 'DC 1a',
      type: 'line',
      data: generateRandomData(),
      smooth: true,
      lineStyle: { color: 'rgb(253, 137, 72)' }
    },
    {
      name: 'DC 1b',
      type: 'line',
      data: generateRandomData(),
      smooth: true,
      lineStyle: { color: 'rgb(252, 187, 34)' }
    },
    {
      name: 'Log 1a',
      type: 'line',
      data: generateRandomData(),
      smooth: true,
      lineStyle: { color: 'rgb(253, 0, 0)' }
    }
  ]
}

// 初始化图表
const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value) // 初始化 ECharts 实例
    chartInstance.setOption(chartOptions) // 设置图表的配置
  }
}

// 销毁图表实例
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose()
  }
})

// 在组件挂载时初始化图表
onMounted(() => {
  initChart()
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>
