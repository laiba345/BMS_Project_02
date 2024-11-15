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
      backgroundColor: 'rgba(7, 106, 235, 0.1)',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        data: ['Normal', 'Disnormal'],
        bottom: '2%',
        textStyle: { color: '#B9E8FF' }
      },
      grid: {
        left: '2%',
        right: '2%',
        top: '10%',
        bottom: '10%',
        containLabel: true,
        // height: '70%'
      },
      xAxis: {
        type: 'value',
        min: -20,
        max: 120,
        splitNumber: 10,
        splitLine: {
          lineStyle: {
            color: '#B9E8FF',
            type: 'dashed'
          }
        },
        axisLabel: {
          color: '#B9E8FF',
          formatter: (value: number) => (value < 0 ? Math.abs(value) : value)
        },
        axisLine: {
          show: true, 
          lineStyle: {
            color: '#B9E8FF'
          }
        }
      },
      yAxis: [
        {
          type: 'category',
          position: 'left',
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: '#B9E8FF',
              type: 'solid' 
            }
          },
          axisLabel: { color: '#B9E8FF' },
          data: [
            'Task',
            'Service',
            'Resource',
            '',
            'Task',
            'Service',
            'Resource',
            '',
            'Task',
            'Service',
            'Resource'
          ]
        },
        {
          type: 'category',
          position: 'right',
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: '#B9E8FF',
              type: 'solid' 
            }
          },
          axisLabel: {
            color: '#B9E8FF',
            formatter: (value: any) => value
          },
          data: ['', 'PURE', '', '', '', 'SRGBU', '', '', '', 'WNBU', '']
        }
      ],
      series: [
        {
          name: 'Normal',
          type: 'bar',
          stack: 'total',
          barWidth: '40%',
          label: {
            show: false
          },
          itemStyle: { color: 'rgb(0, 180, 51)' },
          data: [85, 45, 65, 0, 85, 82, 39, 0, 59, 118, 42]
        },
        {
          name: 'Disnormal',
          type: 'bar',
          stack: 'total',
          barWidth: '30%',
          label: {
            show: false
          },
          itemStyle: { color: 'rgb(245, 1, 1)' },
          data: [-4, -2, -12, 0, -4, -3, -7, 0, -8, -9, -3]
        }
      ]
    }
    chartInstance.setOption(option)
  }
}

const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

onMounted(() => {
  initChart()
  // 在 mounted 时监听窗口大小变化，自动调整图表大小
  window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
  // 在卸载时清理事件监听器
  window.removeEventListener('resize', resizeChart)
  chartInstance && chartInstance.dispose() // 销毁实例，释放资源
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%; /* 使用100%的父容器高度进行适配 */
}
</style>
