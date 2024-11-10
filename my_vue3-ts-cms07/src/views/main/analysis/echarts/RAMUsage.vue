<template>
    <div ref="chartRef" class="chart"></div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import * as echarts from 'echarts'
  
  const chartRef = ref(null)
  let chartInstance: any = null
  
  // 横坐标数据
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
  
  // 生成随机数据函数
  const generateRandomData = () =>
    Array.from({ length: xAxisData.length }, () =>
      Math.floor(Math.random() * 121)
    )
  
  // 折线图的配置项
  const chartOptions = {
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
      itemGap: 20, // 调整图例项之间的间距
      textStyle: {
        color: 'rgb(246, 246, 247)'
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
        color: 'rgb(235, 237, 238)'
      },
      axisLine: {
        lineStyle: {
          color: 'rgb(235, 237, 238)'
        }
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 120, // 固定纵坐标最大值为 120
      splitNumber: 6,
      axisTick: { show: false },
      axisLabel: {
        color: 'rgb(235, 237, 238)'
      },
      axisLine: {
        show: true, 
        lineStyle: {
          color: 'rgb(235, 237, 238)'
        }
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: 'rgb(235, 237, 238)'
        }
      },
      boundaryGap: ['0%', '5%'] // 添加上限额外的 5% 空间
    },
    series: [
      {
        name: 'Fusion 1a',
        type: 'line',
        data: generateRandomData(),
        smooth: true,
        showSymbol: false, // 隐藏数据点
        lineStyle: { color: 'rgb(44, 101, 220)' }
      },
      {
        name: 'Fusion 1b',
        type: 'line',
        data: generateRandomData(),
        smooth: true,
        showSymbol: false, // 隐藏数据点
        lineStyle: { color: 'rgb(44, 95, 54)' }
      },
      {
        name: 'DC 1a',
        type: 'line',
        data: generateRandomData(),
        smooth: true,
        showSymbol: false, // 隐藏数据点
        lineStyle: { color: 'rgb(237, 142, 86)' }
      },
      {
        name: 'DC 1b',
        type: 'line',
        data: generateRandomData(),
        smooth: true,
        showSymbol: false, // 隐藏数据点
        lineStyle: { color: 'rgb(244, 191, 74)' }
      },
      {
        name: 'Log 1a',
        type: 'line',
        data: generateRandomData(),
        smooth: true,
        showSymbol: false, // 隐藏数据点
        lineStyle: { color: 'rgb(234, 51, 35)' }
      }
    ], 
    grid: {
      top: '12%',
      bottom: '12%',
      right: '5%'
    },
  }
  
  // 初始化图表
  const initChart = () => {
    if (chartRef.value) {
      chartInstance = echarts.init(chartRef.value)
      chartInstance.setOption(chartOptions)
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
    height: 350px;
  }
  </style>
  