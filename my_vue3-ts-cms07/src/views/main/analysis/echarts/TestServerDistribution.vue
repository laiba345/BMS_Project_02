<template>
  <div id="main" class="echart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted } from 'vue'

onMounted(() => {
  const chartDom = document.getElementById('main')
  const myChart = echarts.init(chartDom)

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
      // 图例宽高以及其间距设置
      itemWidth: 16,
      itemHeight: 10,
      itemGap: 20,
      textStyle: {
        color: '#B9E8FF',
        fontSize: 10
      }
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
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '55%'],
        center: ['50%', '44%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          formatter: (params: any) => {
            // 使用换行符 "\n" 以及富文本样式控制
            return `{b|${params.name}}\n\n{c|${params.value}}` // 添加额外的 "\n" 提高间距
          },
          rich: {
            b: {
              color: 'rgb(95, 124, 146)',
              fontSize: 12,
              fontWeight: 'bold',
              align: 'center', 
              padding: [0, 0, -6, 0] 
            },
            c: {
              color: '#FFFFFF',
              fontSize: 12,
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
            labelLine: { lineStyle: { color: 'rgb(0, 180, 51)' } },
            label: { color: 'red', fontWeight: '400' }
          },
          {
            value: 12,
            name: 'WNBU',
            itemStyle: { color: 'rgb(7, 106, 235)' },
            labelLine: { lineStyle: { color: 'rgb(7, 106, 235)' } },
            label: { color: '#B9E8FF', fontWeight: '400' }
          },
          {
            value: 26,
            name: 'PURE',
            itemStyle: { color: 'rgb(254, 188, 34)' },
            labelLine: { lineStyle: { color: 'rgb(254, 188, 34)' } },
            label: { color: '#B9E8FF', fontWeight: '400' }
          }
        ]
      }
    ]
  }

  myChart.setOption(option)
})
</script>

<style scoped>
.echart {
  width: 100%;
  height: 100%;
}
</style>
