<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

// 使用 ref 绑定图表 DOM
const chartRef = ref(null)
let chartInstance = null

// 配置项
const chartOptions = {
  series: [
    {
      type: 'gauge',
      axisLine: {
        lineStyle: {
          width: 30,
          color: [
            [0.3, '#67e0e3'],
            [0.7, '#37a2da'],
            [1, '#fd666d']
          ]
        }
      },
      pointer: {
        itemStyle: {
          color: 'auto'
        }
      },
      axisTick: {
        distance: -30,
        length: 8,
        lineStyle: {
          color: '#fff',
          width: 2
        }
      },
      splitLine: {
        distance: -30,
        length: 30,
        lineStyle: {
          color: '#fff',
          width: 4
        }
      },
      axisLabel: {
        color: 'inherit',
        distance: 40,
        fontSize: 20
      },
      detail: {
        valueAnimation: true,
        formatter: '{value} km/h',
        color: 'inherit'
      },
      data: [
        {
          value: 70 // 初始值
        }
      ]
    }
  ]
}

// 初始化图表
const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value) // 初始化 ECharts 实例
    chartInstance.setOption(chartOptions) // 设置图表配置
  }
}

// 更新图表数据的函数
const updateChartData = () => {
  if (chartInstance) {
    chartInstance.setOption({
      series: [
        {
          data: [
            {
              value: +(Math.random() * 100).toFixed(2) // 随机更新值
            }
          ]
        }
      ]
    })
  }
}

// 在组件挂载时初始化图表并设置定时更新
onMounted(() => {
  initChart()

  // 每 2 秒更新一次图表数据
  const interval = setInterval(updateChartData, 2000)

  // 在组件卸载时清除定时器和销毁图表实例
  onBeforeUnmount(() => {
    clearInterval(interval)
    if (chartInstance) {
      chartInstance.dispose()
    }
  })
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>
