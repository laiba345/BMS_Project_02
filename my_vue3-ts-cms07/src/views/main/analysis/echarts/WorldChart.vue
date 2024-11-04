<template>
  <div ref="chart" class="world-map-chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

const chart = ref(null);  // 引用 DOM 元素
let chartInstance: any = null; // ECharts 实例

// 初始化 ECharts 地图
const initChart = () => {
  if (chart.value) {
    chartInstance = echarts.init(chart.value);

    // 获取世界地图数据并注册地图
    fetch('/world.json')
      .then(response => response.json())
      .then(worldGeoJson => {
        echarts.registerMap('world', worldGeoJson); // 注册世界地图

        chartInstance.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{b}', // 显示区域名称
          },
          geo: {
            map: 'world',
            roam: true,
            label: {
              show: false, // 默认情况下不显示标签
              color: '#fff',
            },
            itemStyle: {
              areaColor: 'rgb(7, 106, 235)', // 设置地图区域颜色
              borderColor: '#111',
            },
            emphasis: {
              itemStyle: {
                areaColor: '#a0a0a0',
              },
            },
            // 仅显示特定地区的标签
            regions: [
              {
                name: 'Beijing',
                label: {
                  show: true, // 显示北京标签
                  color: '#ffeb3b', // 标签颜色为亮黄色
                  fontSize: 12,
                  fontWeight: 'bold',
                },
                itemStyle: {
                  color: 'rgba(255, 235, 59, 0.8)', // 光源效果
                  shadowBlur: 10,
                  shadowColor: '#ffeb3b',
                }
              },
              {
                name: 'Mexico',
                label: {
                  show: true, // 显示墨西哥标签
                  color: '#ffeb3b',
                  fontSize: 12,
                  fontWeight: 'bold',
                },
                itemStyle: {
                  color: 'rgba(255, 235, 59, 0.8)',
                  shadowBlur: 10,
                  shadowColor: '#ffeb3b',
                }
              },
              {
                name: 'Vietnam',
                label: {
                  show: true, // 显示越南标签
                  color: '#ffeb3b',
                  fontSize: 12,
                  fontWeight: 'bold',
                },
                itemStyle: {
                  color: 'rgba(255, 235, 59, 0.8)',
                  shadowBlur: 10,
                  shadowColor: '#ffeb3b',
                }
              }
            ]
          },
          series: [
            {
              name: 'Tectonic Plates',
              type: 'map',
              geoIndex: 0,
              data: [
                { name: 'Pacific Plate', value: 1 },
                { name: 'North American Plate', value: 2 },
                { name: 'Eurasian Plate', value: 3 },
                // 其他板块数据
              ],
            },
          ],
        });
      });
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
.world-map-chart {
  width: 100%;
  height: 800px;
}
</style>


