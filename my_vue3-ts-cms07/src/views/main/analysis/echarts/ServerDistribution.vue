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
        textStyle: {
          color: 'rgb(209, 212, 215)' // 设置标题颜色
        }
      },
      xAxis: {
        type: 'category',
        data: ['FOL', 'FVN', 'FJZ', 'FSJ', 'FTX', 'FCZ'], // 自定义横坐标数据
        axisLabel: {
          color: 'rgb(209, 212, 215)' // 横坐标标签颜色
        },
        axisLine: {
          lineStyle: {
            color: 'rgb(209, 212, 215)' // 横坐标轴线颜色
          }
        },
        axisTick: {
          show: false // 隐藏横坐标的刻度
        }
      },
      yAxis: {
        type: 'value',
        min: 0, // 纵坐标最小值
        max: 2500, // 纵坐标最大值
        axisLabel: {
          color: 'rgb(209, 212, 215)' // 纵坐标标签颜色
        },
        axisLine: {
          show: true, 
          lineStyle: {
            color: 'rgb(209, 212, 215)' // 纵坐标轴线颜色
          }
        },
        axisTick: {
          show: false // 隐藏纵坐标的刻度
        },
        splitLine: {
          show: true, // 启用纵坐标的网格线
          lineStyle: {
            type: 'dashed', // 设置网格线为虚线
            color: 'rgb(209, 212, 215)' // 设置网格线颜色
          }
        }
      },
      series: [
        {
          data: [1509, 1467, 993, 478, 984, 1005], // 纵坐标数据
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)', // 背景色设置
            barBorderRadius: [5, 5, 0, 0], // 背景柱子顶部圆角
            borderWidth: 1 // 确保背景柱的边框
          },
          itemStyle: {
            color: 'rgb(7, 106, 235)', // 实体柱子的颜色
            barBorderRadius: [3, 3, 0, 0] // 实体柱子的顶部圆角
          },
          barWidth: '60%', // 实际柱状图宽度，使其比背景柱小
          label: {
            show: true,
            position: 'top', // 显示在柱子上方
            color: 'rgb(209, 212, 215)', // 设置标签文字颜色
            fontSize: 12,
            formatter: '{c}' // 显示具体数值
          }
        }
      ],
      grid: {
        top: '20%', // 增加顶部间距以避免标题和图表的重叠
        bottom: '10%', // 增加底部间距，确保图例或标签不会被遮挡
        // left: '5%', // 增加左边距
        right: '5%' // 增加右边距
      }
    };

    // 将配置应用到图表实例
    chartInstance.setOption(option);
  }
};

// 组件挂载时初始化图表，并监听窗口大小变化
onMounted(() => {
  initChart();
  window.addEventListener('resize', () => {
    chartInstance && chartInstance.resize();  // 自动调整图表大小
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
  width: 100%;    /* 自适应父容器的宽度 */
  height: 350px;  /* 设置图表高度 */
}
</style>
