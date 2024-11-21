<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{ name: string }>()
const chartRef = ref(null)
let chartInstance: any = null

// 配置项
const chartOptions = {
  series: [
    {
      type: 'gauge',
      radius: '50%',
      startAngle: 180,
      endAngle: 0,
      splitNumber: 4,
      axisLine: {
        lineStyle: {
          width: 6,
          color: [[1, 'rgba(27, 67, 108, 0.6)']]
        }
      },
      pointer: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      detail: {
        show: false
      }
    },
    {
      type: 'gauge',
      radius: '75%',
      startAngle: 180,
      endAngle: 0,
      axisLine: {
        lineStyle: {
          width: 7,
          color: [
            [0.5, 'rgb(0, 166, 47)'],
            [0.7, 'rgb(251, 186, 34)'],
            [1, 'rgb(254, 0, 0)']
          ]
        }
      },
      pointer: {
        icon: 'path://M-2 0 L2 0 L0 -100 Z',
        length: '80%',
        width: 5,
        itemStyle: {
          color: '#E0E1E4'
        }
      },
      anchor: {
        show: true,
        size: 7,
        itemStyle: {
          color: '#E0E1E4',
          borderWidth: 13,
          borderColor: 'rgba(10, 24, 43, 1)',
          shadowBlur: 0,
          shadowColor: 'rgba(224, 225, 228, 0.1)'
        }
      },
      axisTick: {
        show: true,
        distance: 25,
        length: 6,
        lineStyle: {
          color: '#FFFFFF',
          width: 1
        }
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#FFFFFF',
        distance: -37,
        fontSize: 10,
        formatter: (value: any) => (value % 20 === 0 ? value : '')
      },
      detail: {
        valueAnimation: true,
        formatter: (value: number) =>
          `{value|${value.toFixed(0)} %}\n{name|${props.name}}`, 
        fontSize: 12,
        offsetCenter: [0, '60%'],
        rich: {
          value: {
            fontSize: 12,
            color: '#FFFFFF',
            fontWeight: '500'
          },
          name: {
            fontSize: 12,
            color: '#FFFFFF',
            lineHeight: 5
          }
        }
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
  /* background: url('../echarts/dashboard/DashBoardOne.png') no-repeat center;
  background-position: 48px 29px;
  background-size: 56px 27px; */
}
</style>
