<template>
  <div ref="chart" class="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

const chart = ref(null);  // DOM 元素引用
let chartInstance: any = null; // ECharts 实例

// 初始化 ECharts 图表
const initChart = () => {
  if (chart.value) {
    chartInstance = echarts.init(chart.value);

    // 设置图表的配置
    const option = {
      title: {
        text: 'Server Distribution', // 图表标题
        left: 'left', // 标题位置：左上角
      },
      xAxis: {
        type: 'category',
        data: ['FOL', 'FVN', 'FJZ', 'FSJ', 'FTX', 'FCZ'] // 自定义横坐标数据
      },
      yAxis: {
        type: 'value',
        min: 0, // 纵坐标最小值
        max: 2500 // 纵坐标最大值
      },
      series: [
        {
          data: [1509, 1467, 993, 478, 984, 1005], // 纵坐标数据
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)' // 背景色设置
          }
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
  height: 400px; /* 图表高度 */
}
</style>
