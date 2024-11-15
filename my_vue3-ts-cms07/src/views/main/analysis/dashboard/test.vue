要使 ECharts 图表在容器高度变为 260px 时自动适应并缩小，你已经在 `window` 的 `resize` 事件中添加了 `resize` 方法，这已经是一种很好的做法。ECharts 会根据容器的大小进行自动缩放。

但是，你可能希望在容器的高度为 260px 时动态更新 ECharts 图表的大小，并确保它在容器高度变化时自适应缩小。为了更好地实现这一点，我们可以通过 CSS 和 JavaScript 结合来做出调整。

### 步骤

1. **动态调整容器高度**: 你需要确保 `.chart` 元素的高度能够动态变化，例如在某些情况下高度变为 260px。

2. **监听容器高度变化**: 你已经在 `resize` 事件中使用 `chartInstance.resize()` 来适应窗口变化，但我们还需要监听 `.chart` 元素本身的高度变化，并调用 `resize()` 方法以确保 ECharts 图表能够响应容器高度的变化。

3. **添加条件**: 如果容器高度为 260px，图表应该在 260px 高度时自适应缩小。

### 代码更新

我们会通过 `ResizeObserver` 来监听容器高度的变化，这样就能确保在容器尺寸发生变化时图表能够自适应更新。

```html
<template>
  <div ref="chart" class="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue'
import * as echarts from 'echarts'

const chart = ref(null)
let chartInstance: any = null

const initChart = () => {
  if (chart.value) {
    chartInstance = echarts.init(chart.value)

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        data: ['Normal', 'Disnormal'],
        bottom: '10%',
        textStyle: { color: '#B9E8FF' }
      },
      grid: {
        left: '2%',
        right: '2%',
        top: '10%',
        bottom: '10%',
        containLabel: true,
        height: '70%'
      },
      xAxis: {
        type: 'value',
        min: -20,
        max: 120,
        splitNumber: 10,
        splitLine: {
          lineStyle: {
            color: '#B9E8FF',
            type: 'dashed'
          }
        },
        axisLabel: {
          color: '#B9E8FF',
          formatter: (value: number) => (value < 0 ? Math.abs(value) : value)
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
              color: '#B9E8FF',
              type: 'solid' 
            }
          },
          axisLabel: { color: '#B9E8FF' },
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
            formatter: (value: any) => value
          },
          data: ['', 'PURE', '', '', '', 'SRGBU', '', '', '', 'WNBU', '']
        }
      ],
      series: [
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
          barWidth: '30%',
          label: {
            show: false
          },
          itemStyle: { color: 'rgb(245, 1, 1)' },
          data: [-4, -2, -12, 0, -4, -3, -7, 0, -8, -9, -3]
        }
      ]
    }
    chartInstance.setOption(option)
    window.addEventListener('resize', () => {
      chartInstance && chartInstance.resize()
    })
  }
}

// ResizeObserver 用来监听 chart 容器的高度变化
const observeHeightChange = () => {
  const observer = new ResizeObserver(() => {
    if (chartInstance) {
      chartInstance.resize()
    }
  })
  if (chart.value) {
    observer.observe(chart.value)
  }
}

onMounted(() => {
  initChart()
  observeHeightChange()  // 监听容器大小变化
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    chartInstance && chartInstance.resize()
  })
  chartInstance && chartInstance.dispose()
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 360px; /* 默认为 360px */
}

.chart.shrink { 
  height: 260px; /* 设置为 260px 时 */
}
</style>
```
 