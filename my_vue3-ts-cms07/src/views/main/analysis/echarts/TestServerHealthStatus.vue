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
        itemWidth: 16,
        itemHeight: 10,
        itemGap: 20,
        textStyle: { color: '#B9E8FF', fontSize: 10 }
      },
      grid: {
        left: '2%',
        right: '2%',
        top: '10%',
        bottom: '10%',
        containLabel: true
        // height: '70%'
      },
      xAxis: {
        type: 'value',
        min: -60, // 左侧 -60 对应 10
        max: 140, // 右侧正常最大值
        splitNumber: 11,
        axisLabel: {
          color: '#B9E8FF',
          formatter: (value: any) => {
            if (value === 0) return '0' // 中心刻度
            if (value === -20) return '5' // 左侧刻度 -50 映射为 10
            if (value === -40) return '10' // 左侧刻度 -25 映射为 5
            if ([20, 40, 60, 80, 100, 120].includes(value)) {
              return value.toString() // 右侧正常显示
            }
            return '' // 其他值隐藏
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#B9E8FF',
            type: 'dashed'
          }
        },
        axisTick: {
          show: false,
          alignWithLabel: true
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
              type: 'solid' // 确保是实线
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
              type: 'solid' // 设置为实线
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
          data: [85, 45, 65, 0, 85, 82, 39, 0, 59, 118, 42], 
        },
        {
          name: 'Disnormal',
          type: 'bar',
          stack: 'total',
          barWidth: '40%',
          label: {
            show: false
          },
          itemStyle: { color: 'rgb(245, 1, 1)' },
          data: [-4*4, -2*4, -12*4, 0, -4*4, -3*4, -7*4, 0, -8*4, -9*4, -3*4]
        },
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
  window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  chartInstance && chartInstance.dispose()
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
