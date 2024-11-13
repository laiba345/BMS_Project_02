<template>
  <div ref="chart" class="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const chart = ref(null)
let chartInstance: any = null

const initChart = () => {
  if (chart.value) {
    chartInstance = echarts.init(chart.value)

    const option = {
      backgroundColor: 'rgb(13, 29, 48)',
      title: {
        text: 'Server Distribution',
        left: 'left',
        textStyle: {
          fontSize: 15,
          fontWeight: '700',
          color: '#FFFFFF'
        }
      },
      xAxis: {
        type: 'category',
        data: ['FOL', 'FVN', 'FJZ', 'FSJ', 'FTX', 'FCZ'],
        axisLabel: {
          color: 'rgb(209, 212, 215)'
        },
        axisLine: {
          lineStyle: {
            color: 'rgb(209, 212, 215)'
          }
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 2500,
        axisLabel: {
          color: 'rgb(209, 212, 215)'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgb(209, 212, 215)'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: 'rgb(209, 212, 215)'
          }
        }
      },
      grid: {
        top: '20%',
        bottom: '10%',
        right: '5%'
      },
      series: [
        {
          data: [2500, 2500, 2500, 2500, 2500, 2500],
          type: 'bar',
          barWidth: '70%', 
          itemStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
            barBorderRadius: [5, 5, 0, 0]
          },
          silent: true,
          z: 1
        },
        {
          data: [1509, 1467, 993, 478, 984, 1005],
          type: 'bar',
          barWidth: '36%', 
          barGap: '-76%', 
          itemStyle: {
            color: 'rgb(7, 106, 235)',
            barBorderRadius: [3, 3, 0, 0]
          },
          label: {
            show: true,
            position: 'top',
            color: 'rgb(209, 212, 215)',
            fontSize: 12,
            formatter: '{c}'
          },
          z: 2
        }
      ]
    }
    chartInstance.setOption(option)
  }
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', () => {
    chartInstance && chartInstance.resize()
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    chartInstance && chartInstance.resize()
  })
  chartInstance && chartInstance.dispose()
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 350px;
}
</style>