<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

// DOM引用
const chartRef = ref<HTMLDivElement | null>(null);

// ECharts 实例
let chartInstance: echarts.ECharts | null = null;

// xAxis 数据
const xAxisData = ['14:15', '14:35', '14:55', '15:15', '15:35', '15:55', '16:15', '16:35'];

// 随机数据生成函数
const generateRandomData = () =>
  Array.from({ length: xAxisData.length }, () => Math.floor(Math.random() * 121));

// 图表配置项
const chartOptions = {
  backgroundColor: 'rgb(7, 106, 235, 0.1)',
  title: {
    text: 'CPU Usage',
    left: 'center',
    padding: [18, 0, 0, 0],
    textStyle: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#FFFFFF'
    }
  },
  legend: {
    bottom: '5%',
    data: ['Fusion 1a', 'Fusion 1b', 'DC 1a', 'DC 1b', 'Log 1a'],
    icon: 'rect',
    itemWidth: 14,
    itemHeight: 8,
    itemGap: 10,
    textStyle: {
      color: '#B9E8FF',
      fontSize: 10
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
      color: '#B9E8FF',
      fontSize: 11
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(185, 232, 255)'
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
      color: '#B9E8FF',
      fontSize: 11
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
      }
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
    top: '20%',
    bottom: '25%',
    right: '4%',
    left: '10%'
  }
};

// 初始化图表
const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);
    chartInstance.setOption(chartOptions);
    window.addEventListener('resize', resizeChart); // 监听窗口变化
  }
};

// 处理窗口大小变化
const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize(); // 调整图表大小
  }
};

// 清理资源
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
  window.removeEventListener('resize', resizeChart); // 移除事件监听
});

// 组件挂载时初始化图表
onMounted(() => {
  initChart();
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 250px; /* 你可以根据需要调整图表高度 */
}
</style>
