<template>
  <div ref="chartRef" class="chart" :style="{ backgroundPosition }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

// 定义组件的 Props
const props = defineProps<{ name: string; backgroundPosition: string }>();

// DOM引用
const chartRef = ref<HTMLDivElement | null>(null);

// ECharts 实例和定时器变量
let chartInstance: echarts.ECharts | null = null;
let interval: ReturnType<typeof setInterval> | null = null;

// 仪表盘的初始配置
const chartOptions = {
  series: [
    {
      type: 'gauge',
      radius: '75%',
      z: 10,
      startAngle: 180,
      endAngle: 0,
      axisLine: {
        lineStyle: {
          width: 6,
          color: [
            [0.5, 'rgb(0, 166, 47)'],
            [0.7, 'rgb(251, 186, 34)'],
            [1, 'rgb(254, 0, 0)']
          ]
        }
      },
      pointer: {
        icon: 'path://M-2 0 L2 0 L0 -100 Z',
        length: '80%',
        width: 5,
        itemStyle: {
          color: '#E0E1E4'
        }
      },
      anchor: {
        show: true,
        size: 7,
        itemStyle: {
          color: '#E0E1E4',
          borderWidth: 13,
          borderColor: 'rgba(10, 24, 43, 1)',
          shadowBlur: 0,
          shadowColor: 'rgba(224, 225, 228, 0.1)'
        }
      },
      axisTick: {
        show: true,
        distance: 25,
        length: 6,
        lineStyle: {
          color: '#FFFFFF',
          width: 1
        }
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#FFFFFF',
        distance: -33,
        fontSize: 7,
        formatter: (value: any) => (value % 20 === 0 ? value : '')
      },
      detail: {
        valueAnimation: true,
        formatter: (value: number) => `{value|${value.toFixed(0)} %}\n{name|${props.name}}`,
        fontSize: 10,
        offsetCenter: [0, '50%'],
        rich: {
          value: {
            fontSize: 10,
            color: '#FFFFFF',
            fontWeight: '500'
          },
          name: {
            fontSize: 10,
            color: '#FFFFFF',
            lineHeight: 5
          }
        }
      },
      data: [
        {
          value: 70 // 初始值
        }
      ]
    },
    {
      type: 'gauge',
      radius: '30%',
      startAngle: 180,
      endAngle: 0,
      splitNumber: 4,
      axisLine: {
        lineStyle: {
          width: 3,
          color: [[1, 'rgba(27, 67, 108, 0.6)']]
        }
      },
      pointer: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      detail: {
        show: false
      }
    }
  ]
};

// 初始化图表
const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);
    chartInstance.setOption(chartOptions);
  }
};

// 动态更新图表数据
const updateChartData = () => {
  if (chartInstance) {
    const randomValue = Math.random() * 100;
    chartInstance.setOption({
      series: [
        {
          data: [{ value: randomValue }]
        }
      ]
    });
  }
};

onMounted(() => {
  initChart();
  interval = setInterval(updateChartData, 2000);
});

onBeforeUnmount(() => {
  if (interval) {
    clearInterval(interval);
  }
  if (chartInstance) {
    chartInstance.dispose();
  }
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
  background: url('../echarts/dashboard/DashBoardOne.png') no-repeat center;
  background-size: 48px 24px;
}
</style>

