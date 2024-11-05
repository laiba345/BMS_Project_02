<!-- src/components/GaugeChart.vue
<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chartInstance: any = null

const chartOptions = {
  series: [
    {
      type: 'gauge',
      radius: '70%',
      axisLine: {
        lineStyle: {
          width: 20,
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
        distance: -20,
        length: 6,
        lineStyle: {
          color: '#fff',
          width: 1
        }
      },
      splitLine: {
        distance: -20,
        length: 20,
        lineStyle: {
          color: '#fff',
          width: 2
        }
      },
      axisLabel: {
        color: 'inherit',
        distance: 25,
        fontSize: 12
      },
      detail: {
        valueAnimation: true,
        formatter: '{value} %',
        color: 'inherit',
        fontSize: 14
      },
      data: [
        {
          value: 70
        }
      ]
    }
  ]
}

const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    chartInstance.setOption(chartOptions)
  }
}

const updateChartData = () => {
  if (chartInstance) {
    chartInstance.setOption({
      series: [
        {
          data: [
            {
              value: +(Math.random() * 100).toFixed(2)
            }
          ]
        }
      ]
    })
  }
}

onMounted(() => {
  initChart()
  const interval = setInterval(updateChartData, 2000)

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
  height: 100%;
}
</style> -->

<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chartInstance = null

// 配置项
const chartOptions = {
  series: [
    {
      type: 'gauge',
      radius: '70%', // 调整仪表盘的半径
      startAngle: 180,
      endAngle: 0,
      axisLine: {
        lineStyle: {
          width: 15, // 将仪表盘宽度调细
          color: [
            [0.5, 'rgb(0, 166, 47)'],    // 0-50 绿色
            [0.7, 'rgb(251, 186, 34)'],  // 50-70 橙色
            [1, 'rgb(254, 0, 0)']        // 70-100 红色
          ]
        }
      },
      pointer: {
        itemStyle: {
          color: 'rgb(224, 225, 228)' // 固定指针颜色
        }
      },
      axisTick: {
        show: true,
        distance: 25, // 将刻度放置在仪表盘外部
        length: 6, // 刻度线长度
        lineStyle: {
          color: '#fff',
          width: 1
        }
      },
      splitLine: {
        show: false // 隐藏分隔线
      },
      axisLabel: {
        color: 'inherit',
        distance: 35, // 将刻度标签放在仪表盘外部
        fontSize: 12,
        formatter: (value) => (value % 20 === 0 ? value : '') // 只显示[0, 20, 40, 60, 80, 100]
      },
      detail: {
        valueAnimation: true,
        formatter: '{value} %',
        color: 'inherit',
        fontSize: 14
      },
      data: [
        {
          value: 70
        }
      ]
    }
  ]
}

// 初始化图表
const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    chartInstance.setOption(chartOptions)
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
              value: +(Math.random() * 100).toFixed(2)
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
  height: 100%;
}
</style>



