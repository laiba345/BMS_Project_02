<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null) 
let chartInstance: any = null

const xAxisData = [
  '14:15',
  '14:35',
  '14:55',
  '15:15',
  '15:35',
  '15:55',
  '16:15',
  '16:35'
]

const generateRandomData = () =>
  Array.from({ length: xAxisData.length }, () =>
    Math.floor(Math.random() * 121)
  )

const chartOptions = {
  backgroundColor: 'rgb(7, 106, 235, 0.1)',
  title: {
    text: 'RAM Usage',
    left: 'center',
    padding: [10, 0, 0, 0],
    textStyle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#FFFFFF'
    }
  },
  legend: {
    bottom: '0%',
    data: ['Fusion 1a', 'Fusion 1b', 'DC 1a', 'DC 1b', 'Log 1a'],
    icon: 'rect',
    itemWidth: 14,
    itemHeight: 8,
    itemGap: 20,
    textStyle: {
      color: '#B9E8FF'
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: xAxisData,
    axisTick: { show: false },
    axisLabel: {
      color: '#B9E8FF'
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(185, 232, 255)', 
      }
    }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 120,
    splitNumber: 5,
    axisTick: { show: false },
    axisLabel: {
      color: '#B9E8FF'
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgb(235, 237, 238)'
      }
    },
    splitLine: {
      show: true, 
      lineStyle: {
        type: 'dashed',
        color: 'rgb(235, 237, 238, 0.4)'
      }, 
    },
    boundaryGap: ['0%', '5%']
  },
  series: [
    {
      name: 'Fusion 1a',
      type: 'line',
      data: generateRandomData(),
      smooth: true,
      showSymbol: false,
      lineStyle: { color: '#076AEB' },
      itemStyle: { color: '#076AEB' } 
    },
    {
      name: 'Fusion 1b',
      type: 'line',
      data: generateRandomData(),
      smooth: true,
      showSymbol: false,
      lineStyle: { color: '#01A42F' },
      itemStyle: { color: '#01A42F' }
    },
    {
      name: 'DC 1a',
      type: 'line',
      data: generateRandomData(),
      smooth: true,
      showSymbol: false,
      lineStyle: { color: '#FF8A48' },
      itemStyle: { color: '#FF8A48' }
    },
    {
      name: 'DC 1b',
      type: 'line',
      data: generateRandomData(),
      smooth: true,
      showSymbol: false,
      lineStyle: { color: '#FEBC22' },
      itemStyle: { color: '#FEBC22' }
    },
    {
      name: 'Log 1a',
      type: 'line',
      data: generateRandomData(),
      smooth: true,
      showSymbol: false,
      lineStyle: { color: '#FF0000' },
      itemStyle: { color: '#FF0000' }
    }
  ],

  grid: {
    top: '12%',
    bottom: '17%',
    right: '3%',
    left: '8%'
  }
}

const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    chartInstance.setOption(chartOptions)
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
  height: 230px; 
}
</style>
