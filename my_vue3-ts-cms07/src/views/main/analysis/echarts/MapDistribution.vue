<!-- <template>
  <div ref="chart" class="world-map-chart"></div>
</template>

<script setup  lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import 'echarts/map/js/world'; // 导入世界地图

const chart = ref(null);
let chartInstance: any = null;

// 初始化 ECharts 地图
const initChart = () => {
  if (chart.value) {
    chartInstance = echarts.init(chart.value);

    chartInstance.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b}', // 显示区域名称
      },
      geo: {
        map: 'world',
        roam: true,
        label: {
          show: true,
          color: '#fff',
        },
        itemStyle: {
          areaColor: '#74a6d8',
          borderColor: '#111',
        },
        emphasis: {
          itemStyle: {
            areaColor: '#a0a0a0',
          },
        },
      },
      series: [
        {
          name: 'Tectonic Plates',
          type: 'map',
          geoIndex: 0,
          data: [
            // 示例数据，可自定义地壳板块的分布
            { name: 'Pacific Plate', value: 1 },
            { name: 'North American Plate', value: 2 },
            { name: 'Eurasian Plate', value: 3 },
            // 其他板块数据
          ],
        },
      ],
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

// 组件卸载时清除事件和实例
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
  height: 600px;
}
</style> -->
