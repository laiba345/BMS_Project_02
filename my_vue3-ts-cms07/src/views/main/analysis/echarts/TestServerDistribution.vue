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

    // 设置图表的配置
    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    };

    // 将配置应用到图表实例
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
  height: 400px; /* 设置图表高度 */
}
</style>
