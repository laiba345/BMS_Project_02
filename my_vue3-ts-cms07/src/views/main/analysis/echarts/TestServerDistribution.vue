<template>
  <div id="main" class="echart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue';

onMounted(() => {
  const chartDom = document.getElementById('main');
  const myChart = echarts.init(chartDom);

  const option = {
    backgroundColor: 'rgba(7, 106, 235, 0.1)',
    tooltip: {
      trigger: 'item',
      textStyle: {
        color: 'rgb(185, 189, 193)', 
      },
    },
    legend: {
      orient: 'horizontal',
      bottom: '5%', 
      textStyle: {
        color: '#B9E8FF', 
      },
    },
    series: [
      // 中间装饰环
      {
        type: 'pie',
        radius: ['28%', '30%'], 
        center: ['50%', '44%'],
        label: { show: false }, 
        data: [
          { value: 1, itemStyle: { color: 'rgb(36, 90, 144)' } },
        ],
        silent: true, 
      },
      // 外层实际数据饼图
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '55%'], // 环状大小
        center: ['50%', '44%'], // 顶部距离
        avoidLabelOverlap: false,
        label: {
          show: true,
          formatter: '{b} {c}', // 显示标签名和数值
          color: 'rgb(95, 124, 146)', // 标签颜色
          fontSize: 14,
          fontWeight: 'bold',
        },
        labelLine: {
          show: true,           
          length: 20,           
          length2: 10,          
          smooth: true,         
          lineStyle: {
            type: 'dashed',     
            width: 1.5,         
          },
        },
        data: [
          {
            value: 18,
            name: 'SRGBU',
            itemStyle: { color: 'rgb(0, 180, 51)' },
            labelLine: {
              lineStyle: { color: 'rgb(0, 180, 51)' }, 
            },
            label: {
              color: '#B9E8FF', 
              fontWeight: 'bold',
            },
          },
          {
            value: 12,
            name: 'WNBU',
            itemStyle: { color: 'rgb(7, 106, 235)' },
            labelLine: {
              lineStyle: { color: 'rgb(7, 106, 235)' },
            },
            label: {
              color: '#B9E8FF', 
              fontWeight: 'bold',
            },
          },
          {
            value: 26,
            name: 'PURE',
            itemStyle: { color: 'rgb(254, 188, 34)' },
            labelLine: {
              lineStyle: { color: 'rgb(254, 188, 34)' }, 
            },
            label: {
              color: '#B9E8FF', 
              fontWeight: 'bold',
            },
          },
        ],
      },
    ],
  };

  myChart.setOption(option);
});
</script>

<style scoped>
.echart {
  width: 100%;
  height: 100%;
}
</style>
