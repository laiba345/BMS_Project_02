<template>
  <div id="main" style="width: 600px; height: 400px;"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue';

onMounted(() => {
  const chartDom = document.getElementById('main');
  const myChart = echarts.init(chartDom);

  const option = {
    tooltip: {
      trigger: 'item',
      textStyle: {
        color: 'rgb(185, 189, 193)', // 数值颜色
      },
    },
    legend: {
      orient: 'horizontal',
      bottom: '5%', // 图例放置在饼图的下方
      textStyle: {
        color: 'rgb(111, 145, 165)', // 图例字体颜色
      },
    },
    series: [
      // 中间装饰环
      {
        type: 'pie',
        radius: ['28%', '30%'], // 设置为环形
        label: { show: false }, // 隐藏标签
        data: [
          { value: 1, itemStyle: { color: 'rgb(36, 90, 144)' } }, // 环的颜色
        ],
        silent: true, // 禁止交互效果
      },
      // 外层实际数据饼图
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '55%'], // 调整饼环的大小
        avoidLabelOverlap: false,
        label: {
          show: true,
          formatter: '{b} {c}', // 显示标签名和数值
          color: 'rgb(95, 124, 146)', // 标签颜色
          fontSize: 14,
          fontWeight: 'bold',
        },
        labelLine: {
          show: true,           // 显示指示线
          length: 20,           // 第一段指示线长度
          length2: 10,          // 第二段指示线长度
          smooth: true,         // 设置指示线为平滑曲线
          lineStyle: {
            type: 'dashed',     // 虚线
            width: 1.5,         // 线条宽度
          },
        },
        data: [
          {
            value: 18,
            name: 'SRGBU',
            itemStyle: { color: 'rgb(0, 180, 51)' },
            labelLine: {
              lineStyle: { color: 'rgb(0, 180, 51)' }, // 与扇区颜色一致的虚线
            },
            label: {
              color: 'rgb(95, 124, 146)', // 指向文本的颜色
              fontWeight: 'bold',
            },
          },
          {
            value: 12,
            name: 'WNBU',
            itemStyle: { color: 'rgb(7, 106, 235)' },
            labelLine: {
              lineStyle: { color: 'rgb(7, 106, 235)' }, // 与扇区颜色一致的虚线
            },
            label: {
              color: 'rgb(95, 124, 146)', // 指向文本的颜色
              fontWeight: 'bold',
            },
          },
          {
            value: 26,
            name: 'PURE',
            itemStyle: { color: 'rgb(254, 188, 34)' },
            labelLine: {
              lineStyle: { color: 'rgb(254, 188, 34)' }, // 与扇区颜色一致的虚线
            },
            label: {
              color: 'rgb(95, 124, 146)', // 指向文本的颜色
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
/* 可根据需要添加自定义样式 */
</style>
