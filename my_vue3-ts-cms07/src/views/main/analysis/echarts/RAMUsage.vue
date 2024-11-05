<template>
    <div ref="chartRef" class="chart"></div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import * as echarts from 'echarts'
  
  // 使用 ref 绑定图表的 DOM 容器
  const chartRef = ref(null)
  let chartInstance: any = null
  
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
        fontWeight: 'bold',
        color: 'rgb(235, 237, 238)' // 设置标题颜色
      }
    },
    legend: {
      bottom: '0%',
      data: ['Fusion 1a', 'Fusion 1b', 'DC 1a', 'DC 1b', 'Log 1a'],
      icon: 'rect', // 设置图例的图标为小矩形
      itemWidth: 14, // 控制图例矩形的宽度
      itemHeight: 8, // 控制图例矩形的高度
      textStyle: {
        color: 'rgb(246, 246, 247)' // 设置图例文字颜色
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisTick: { show: false }, // 隐藏横坐标的刻度
      axisLabel: {
        color: 'rgb(235, 237, 238)' // 设置横坐标标签颜色
      },
      axisLine: {
        lineStyle: {
          color: 'rgb(235, 237, 238)' // 设置横坐标轴颜色
        }
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 120, // 设置纵坐标的最大值为120
      splitNumber: 6, // 将刻度分成6个区间（显示0到120的刻度）
      axisTick: { show: false }, // 隐藏纵坐标的刻度
      axisLabel: {
        color: 'rgb(235, 237, 238)' // 设置纵坐标标签颜色
      },
      axisLine: {
        show: true, // 确保显示纵坐标轴的线
        lineStyle: {
          color: 'rgb(235, 237, 238)' // 设置纵坐标轴颜色
        }
      },
      splitLine: {
        lineStyle: {
          type: 'dashed', // 设置网格线为虚线
          color: 'rgb(235, 237, 238)' // 设置网格线颜色
        }
      }
    },
    grid: {
      top: '12%', // 调整顶部间距，缩小标题和图表的距离
      bottom: '12%' // 为图例留出空间
    },
    series: [
      {
        name: 'Fusion 1a',
        type: 'line',
        data: generateRandomData(),
        smooth: true,
        lineStyle: { color: 'rgb(44, 101, 220)' } // 设置 Fusion 1a 的折线颜色
      },
      {
        name: 'Fusion 1b',
        type: 'line',
        data: generateRandomData(),
        smooth: true,
        lineStyle: { color: 'rgb(44, 95, 54)' } // 设置 Fusion 1b 的折线颜色
      },
      {
        name: 'DC 1a',
        type: 'line',
        data: generateRandomData(),
        smooth: true,
        lineStyle: { color: 'rgb(237, 142, 86)' } // 设置 DC 1a 的折线颜色
      },
      {
        name: 'DC 1b',
        type: 'line',
        data: generateRandomData(),
        smooth: true,
        lineStyle: { color: 'rgb(244, 191, 74)' } // 设置 DC 1b 的折线颜色
      },
      {
        name: 'Log 1a',
        type: 'line',
        data: generateRandomData(),
        smooth: true,
        lineStyle: { color: 'rgb(234, 51, 35)' } // 设置 Log 1a 的折线颜色
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
  