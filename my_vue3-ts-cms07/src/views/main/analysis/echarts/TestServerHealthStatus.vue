<template>
  <div ref="chart" class="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

const chart = ref(null);
let chartInstance: any = null;

const initChart = () => {
  if (chart.value) {
    chartInstance = echarts.init(chart.value);

    const option = {
      backgroundColor: 'rgba(7, 106, 235, 0.1)',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        data: ['Normal', 'Disnormal'],
        bottom: '6%',
        itemWidth: 14,
        itemHeight: 8,
        itemGap: 20,
        textStyle: { color: '#B9E8FF', fontSize: 10 }
      },
      grid: {
        top: '10%',
        left: '2%',
        right: '2%',
        bottom: '20%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        min: -60,
        max: 140,
        splitNumber: 11,
        axisLabel: {
          color: '#B9E8FF',
          fontSize: 11, 
          formatter: (value: any) => {
            if (value === 0) return '0';
            if (value === -20) return '5';
            if (value === -40) return '10';
            if ([20, 40, 60, 80, 100, 120].includes(value)) {
              return value.toString();
            }
            return '';
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(185, 232, 255, 0.3)',
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
              color: 'rgba(185, 232, 255, 0.3)',
              type: 'dashed'
            }
          },
          axisLabel: { color: '#B9E8FF', fontSize: 11, fontWeight: '500' },
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
              type: 'solid'
            }
          },
          axisLabel: {
            color: '#B9E8FF',
            fontSize: 10,
            fontWeight: '500',
            formatter: (value: any) => value
          },
          data: ['', 'PURE', '', '', '', 'SRGBU', '', '', '', 'WNBU', '']
        }
      ],

      series: [
        {
          name: '覆盖线',
          type: 'line',
          markLine: {
            symbol: 'none',
            lineStyle: {
              color: '#B9E8FF',
              type: 'solid',
              width: 1
            },
            label: {
              show: false
            },
            data: [{ xAxis: -60 }]
          }
        },
        {
          name: 'Normal',
          type: 'bar',
          stack: 'total',
          barWidth: '40%',
          label: {
            show: false
          },
          itemStyle: { color: 'rgb(0, 180, 51)' },
          data: [85, 45, 65, 0, 85, 82, 39, 0, 59, 118, 42]
        },
        {
          name: 'Disnormal',
          type: 'bar',
          stack: 'total',
          barWidth: '80%',
          label: {
            show: false
          },
          itemStyle: { color: 'rgb(245, 1, 1)' },
          data: [-4 * 4, -2 * 4, -12 * 4, 0, -4 * 4, -3 * 4, -7 * 4, 0, -8 * 4, -9 * 4, -3 * 4]
        }
      ]
    };
    chartInstance.setOption(option);
  }
};

const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};

onMounted(() => {
  initChart();
  window.addEventListener('resize', resizeChart);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart);
  chartInstance && chartInstance.dispose();
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
