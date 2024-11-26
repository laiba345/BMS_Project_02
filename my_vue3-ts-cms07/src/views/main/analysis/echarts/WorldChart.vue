<template>
  <div ref="chart" class="world-map-chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const chart = ref(null)
let chartInstance: any = null

// 各个地点的经纬度坐标
const geoCoordMap: Record<string, [number, number]> = {
  Vietnam: [108.2772, 14.0583],
  Mexico: [-102.5528, 23.6345],
  Shenzhen: [114.0579, 22.5431],
  Zhengzhou: [113.6254, 34.7466],
  Ohio: [-82.9071, 40.4173],
  Wisconsin: [-89.6165, 43.7844],
  India: [78.9629, 20.5937],
  Austria: [14.5501, 47.5162]
}

// 获取各个地点的数据
const effectScatterData = [
  {
    name: 'Vietnam',
    value: [...geoCoordMap['Vietnam'], 100],
    label: {
      show: true,
      formatter: 'Vietnam',
      position: 'right',
      color: '#FFF'
    }
  },
  {
    name: 'Mexico',
    value: [...geoCoordMap['Mexico'], 100],
    label: { show: true, formatter: 'FJZ', position: 'right', color: '#FFF' }
  },
  {
    name: 'Shenzhen',
    value: [...geoCoordMap['Shenzhen'], 100],
    label: { show: true, formatter: 'FOC', position: 'right', color: '#FFF' }
  },
  {
    name: 'Zhengzhou',
    value: [...geoCoordMap['Zhengzhou'], 100],
    label: { show: true, formatter: 'FOL', position: 'right', color: '#FFF' }
  },
  {
    name: 'Ohio',
    value: [...geoCoordMap['Ohio'], 100],
    label: { show: true, formatter: 'FSJ', position: 'right', color: '#FFF' }
  },
  {
    name: 'Wisconsin',
    value: [...geoCoordMap['Wisconsin'], 100],
    itemStyle: { color: '#FEBC22' },
    symbolSize: 15,
    label: {
      show: true,
      formatter: 'FTX',
      position: 'right',
      color: '#FEBC22',
      fontWeight: 'bold',
      fontSize: 16
    }
  },
  {
    name: 'India',
    value: [...geoCoordMap['India'], 100],
    label: { show: true, formatter: 'India', position: 'right', color: '#FFF' }
  },
  {
    name: 'Austria',
    value: [...geoCoordMap['Austria'], 100],
    label: { show: true, formatter: 'FCZ', position: 'right', color: '#FFF' }
  }
]

const initChart = () => {
  if (chart.value) {
    chartInstance = echarts.init(chart.value)

    // 获取世界地图数据并注册地图
    fetch('/world.json')
      .then((response) => response.json())
      .then((worldGeoJson) => {
        echarts.registerMap('world', worldGeoJson) // 注册世界地图

        chartInstance.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{b}' // 显示区域名称
          },
          geo: {
            map: 'world',
            roam: true,
            zoom: 1.2, // 初始缩放级别
            center: [20, 24], // 初始地图位置设置
            label: {
              show: false,
              color: '#fff'
            },
            itemStyle: {
              areaColor: 'rgb(7, 106, 235)',
              borderColor: '#111'
            },
            emphasis: {
              itemStyle: {
                areaColor: '#a0a0a0'
              }
            }
          },
          series: [
            {
              name: 'Tectonic Plates',
              type: 'map',
              geoIndex: 0,
              data: [
                { name: 'Pacific Plate', value: 1 },
                { name: 'North American Plate', value: 2 },
                { name: 'Eurasian Plate', value: 3 }
              ]
            },
            {
              name: 'Highlight Points',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              symbolSize: (val: number[]) => (val[2] / 100) * 10 + 2,
              rippleEffect: {
                period: 4,
                scale: 2.5,
                brushType: 'stroke'
              },
              itemStyle: {
                color: '#47F6F8'
              },
              encode: {
                tooltip: 2
              },
              label: {
                show: true,
                position: 'right',
                color: '#FFF'
              },
              data: effectScatterData
            }
          ]
        })
      })
  }
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', () => {
    chartInstance && chartInstance.resize()
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    chartInstance && chartInstance.resize()
  })
  chartInstance && chartInstance.dispose()
})
</script>

<style scoped>
.world-map-chart {
  width: 100%;
  height: 626px;
}
</style>
