<template>
  <div id="main" class="echart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, onBeforeUnmount } from 'vue';

onMounted(() => {
  const chartDom = document.getElementById('main');
  const myChart = echarts.init(chartDom);

  const option = {
    backgroundColor: 'rgba(7, 106, 235, 0.1)',
    tooltip: {
      trigger: 'item',
      textStyle: {
        color: 'rgb(185, 189, 193)'
      }
    },
    legend: {
      orient: 'horizontal',
      bottom: '5%',
      itemWidth: 14,
      itemHeight: 8,
      itemGap: 15,
      textStyle: {
        color: '#B9E8FF',
        fontSize: 10
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '38%'],
        center: ['50%', '44%'],
        label: { show: false },
        data: [{ value: 1, itemStyle: { color: 'rgb(36, 90, 144)' }}],
        silent: true
      },
      {
        name: 'Access From',
        type: 'pie',
        radius: ['48%', '60%'],
        center: ['50%', '44%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          formatter: (params: any) => {
            return `{b|${params.name}}\n\n{c|${params.value}}`;
          },
          rich: {
            b: {
              color: 'rgb(95, 124, 146)',
              fontSize: 10,
              fontWeight: 'bold',
              align: 'center',
              padding: [0, 0, -6, 0]
            },
            c: {
              color: '#FFFFFF',
              fontSize: 10,
              fontWeight: 700,
              align: 'center'
            }
          }
        },
        labelLine: {
          show: true,
          length: 20,
          length2: 10,
          smooth: true,
          lineStyle: {
            type: 'dashed',
            width: 1.5
          }
        },
        data: [
          {
            value: 18,
            name: 'SRGBU',
            itemStyle: { color: 'rgb(0, 180, 51)' },
            labelLine: { lineStyle: { color: 'rgb(0, 180, 51)' }},
            label: { color: 'red', fontWeight: '400' }
          },
          {
            value: 12,
            name: 'WNBU',
            itemStyle: { color: 'rgb(7, 106, 235)' },
            labelLine: { lineStyle: { color: 'rgb(7, 106, 235)' }},
            label: { color: '#B9E8FF', fontWeight: '400' }
          },
          {
            value: 26,
            name: 'PURE',
            itemStyle: { color: 'rgb(254, 188, 34)' },
            labelLine: { lineStyle: { color: 'rgb(254, 188, 34)' }},
            label: { color: '#B9E8FF', fontWeight: '400' }
          }
        ]
      }
    ]
  };

  myChart.setOption(option);

  // Resize chart when window size changes
  window.addEventListener('resize', () => {
    myChart.resize();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', () => {
      myChart.resize();
    });
  });
});

</script>

<style scoped>
.echart {
  width: 100%;
  height: 100%;
  background: url('../echarts/dashboard/RingBackground.png') no-repeat center;
  background-position: 50.2% 32%;
  background-size: 146px 146px;
}
</style>
