<template>
  <div ref="chart" class="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

const chart = ref(null); // DOM 元素引用
let chartInstance: any = null; // ECharts 实例

// 初始化 ECharts 图表
const initChart = () => {
  if (chart.value) {
    chartInstance = echarts.init(chart.value);

    // 配置项
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow' // 显示阴影指示器
        },
      },
      legend: {
        data: ['Normal', 'Disnormal'],
        orient: 'horizontal', // 设置图例为水平布局
        bottom: '5%', // 将图例放置在下方
        textStyle: { color: 'rgb(140, 178, 200)' } // 图例字体颜色
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%', // 为图例留出空间
        containLabel: true
      },
      xAxis: {
        type: 'value',
        min: -15,
        max: 120,
        splitNumber: 7, // 将x轴分为几段
        splitLine: { show: true, lineStyle: { color: 'rgb(140, 178, 200)', type: 'solid' } },
        axisLabel: {
          color: 'rgb(140, 178, 200)', // 横坐标字体颜色
          formatter: (value) => Math.abs(value) // 显示绝对值
        },
        axisLine: { lineStyle: { color: 'rgb(140, 178, 200)' } } // 横坐标轴线颜色
      },
      yAxis: {
        type: 'category',
        axisTick: { show: false },
        axisLine: { lineStyle: { color: 'rgb(140, 178, 200)' } }, // 纵坐标轴线颜色
        axisLabel: { color: 'rgb(140, 178, 200)' }, // 纵坐标字体颜色
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] // 示例数据
      },
      series: [
        {
          name: 'Normal',
          type: 'bar',
          stack: 'total', // 堆叠
          label: {
            show: true,
            position: 'insideRight'
          },
          itemStyle: { color: 'rgb(1, 142, 46)' }, // Normal颜色
          data: [30, 40, 50, 60, 70, 80, 90] // 示例数据
        },
        {
          name: 'Disnormal',
          type: 'bar',
          stack: 'total', // 堆叠
          label: {
            show: true,
            position: 'insideLeft'
          },
          itemStyle: { color: 'rgb(255, 0, 0)' }, // Disnormal颜色
          data: [-10, -15, -20, -25, -30, -35, -40] // 示例数据
        }
      ]
    };

    // 设置图表配置项
    chartInstance.setOption(option);
  }
};

// 组件挂载时初始化图表，并监听窗口大小变化
onMounted(() => {
  initChart();
  window.addEventListener('resize', () => {
    chartInstance && chartInstance.resize();
  });
});

// 组件卸载时清除事件和销毁 ECharts 实例
onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    chartInstance && chartInstance.resize();
  });
  chartInstance && chartInstance.dispose();
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 350px; 
}
</style>
