<template>
    <div ref="chart" class="chart"></div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import * as echarts from 'echarts';
  
  const chart = ref(null);
  let chartInstance = null;
  
  const initChart = () => {
    if (chart.value) {
      chartInstance = echarts.init(chart.value);
  
      // 配置项
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
        },
        legend: {
          data: ['Normal', 'Disnormal'],
          bottom: '10%',
          textStyle: { color: 'rgb(140, 178, 200)' },
        },
        grid: {
          left: '2%',
          right: '2%',
          top: '10%',
          bottom: '10%',
          containLabel: true,
          height: '70%',
        },
        xAxis: {
          type: 'value',
          min: -15,
          max: 120,
          splitNumber: 8,
          splitLine: {
            lineStyle: {
              color: 'rgb(140, 178, 200)',
              type: 'dashed',
            },
          },
          axisLabel: {
            color: 'rgb(140, 178, 200)',
            formatter: (value) => {
              if (value < 0) {
                return [-10, -5, 0].includes(value) ? Math.abs(value) : '';
              } else {
                return [0, 20, 40, 60, 80, 100, 120].includes(value) ? value : '';
              }
            },
          },
          axisLine: {
            lineStyle: {
              color: 'rgb(140, 178, 200)',
            },
          },
        },
        yAxis: [
          {
            type: 'category',
            position: 'left',
            axisTick: { show: false },
            axisLine: { lineStyle: { color: 'rgb(140, 178, 200)' } },
            axisLabel: { color: 'rgb(140, 178, 200)' },
            data: [
              'Task',
              'Service',
              'Resource',
              '', // 空白占位符
              'Task',
              'Service',
              'Resource',
              '', // 空白占位符
              'Task',
              'Service',
              'Resource',
            ],
          },
          {
            type: 'category',
            position: 'right',
            axisTick: { show: false },
            axisLine: { lineStyle: { color: 'rgb(140, 178, 200)' } },
            axisLabel: {
              color: 'rgb(140, 178, 200)',
              formatter: (value) => value,
            },
            data: ['', 'PURE', '',  '','', 'SRGBU', '', '', '', 'WNBU', ''],
          },
        ],
        series: [
          {
            name: 'Normal',
            type: 'bar',
            stack: 'total',
            barWidth: '40%',
            label: {
              show: false,
            },
            itemStyle: { color: 'rgb(0, 180, 51)' },
            data: [40, 60, 80, 0, 30, 50, 70, 0, 20, 40, 60],
          },
          {
            name: 'Disnormal',
            type: 'bar',
            stack: 'total',
            barWidth: '30%',
            label: {
              show: false,
            },
            itemStyle: { color: 'rgb(245, 1, 1)' },
            data: [-5, -7, -10, 0, -3, -5, -8, 0, -2, -4, -6],
          },
        ],
      };
  
      // 设置图表配置项
      chartInstance.setOption(option);
  
      // 监听窗口大小变化，自动调整图表尺寸
      window.addEventListener('resize', () => {
        chartInstance && chartInstance.resize();
      });
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
    height: 360px;
  }
  </style>
  