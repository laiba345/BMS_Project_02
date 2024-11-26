<!-- 折图组件 -->
<template>
  <simple-chart
    ref="lineChart"
    :title="{
      show: false,
      text: '',
      subtext:'',
      left: 'center',
    }"
    :colors="lineColor"
    :legend="{ show:false, left:'left', data: [], textStyle: { color:'black',fontSize: 14 }}"
    :height="chartHeight"
    :dataset-source="chartData || []"
    :textStyle="{
      color: 'black',
    }"
    :seriesConfig="seriesConfig"
    :x-axis="{ ...xAxisConfig }"
    :y-axis="[{ ...yAxisConfig }]"
    :grid="{
      top: '20',
      bottom: '0',
      left: '20',
      right: '20',
    }"
    :data-zoom="[ { type: 'slider', show:false }]"
    :loading-config="{ maskColor: '#FFFFFF11', textColor: '#CCC' }"
    :custom-tooltip="{ trigger: 'axis',formatter: tooltipFormatter, borderColor: '#2861C2' }"
    :safeUpdate="isUpdate"
    :markLineShow="true"
    >
  </simple-chart>
</template>
<script setup>
import SimpleChart from '@/components/echart/SimpleChart.vue';

const props = defineProps({
  chartHeight: {
    type: [String, Number],
    default: '186px'
  },
  xData: {
    type: Array,
    default: () => ([])
  },
  chartLabel: {
    type: Array,
    default: () => ([])
  },
  splitLineShow: {
    type: Boolean,
    default: false
  },
  markLineWidth: {
    type: Number,
    default: 1
  },
  chartData: {
    type: Array,
    default: () => ([])
  },
  chartTitle: {
    type: String,
    default: 'resource'
  },
  isUpdate: {
    type: Boolean,
    default: false
  }
});
let lineChart = null;
const lineColor = ref(['#5454ff']);
let xAxisConfig = ref({
  type: 'category',
  axisLine: { lineStyle: { color: 'black' }},
  axisLabel: {
    color: 'black',
    rotate: 0,
    fontSize: 14,
    interval: (index, value) => {
     return props.chartLabel.includes(value);
    },
    formatter: (value) => {
      if (props.chartTitle === 'windowResource') {
        if (value.includes(' 00:')) return `${ value.substring(5, 10) }`;
        return `${ value.substring(11, 14) }00`;
      }
      if (props.chartTitle === 'lowTitle') return value.substring(5, 10);
      return `${ value.substring(11, 14) }00`;
    }
  },
  axisTick: {
    show: false
    // alignWithLabel: true,
  },
  data: props.xData
});
const yAxisConfig = ref({
  show: true,
  type: 'value',
  name: '',
  min: 0,
  max: 100,
  interval: 20,
  axisLabel: {
    color: 'black',
    fontSize: 14,
    formatter: '{value}'
  },
  axisTick: {
    show: false
  },
  axisLine: {
    show: false,
    symbolOffset: [0, 0],
    symbol: ['none', 'none'],
    lineStyle: {
      color: 'black'
    }
  },
  splitLine: {
    show: props.splitLineShow, // 显示分隔线
    lineStyle: {
      width: 1,
      type: 'solid', // 分隔线类型为实线
      color: 'black'
    }
  }
});

const seriesConfig = () => {
  const lineConfig = {
    type: 'line',
    showSymbol: false, // 显示数据的点
    symbolSize: 5,
    label: { show: false },
    lineStyle: {
      width: 2,
      type: 'solid'
    },
    smooth: false,
    markLine: {
      symbol: 'none',
      data: [{
        yAxis: 70,
        name: 'Alert'
      }],
      label: {
        show: true,
        position: 'start',
        formatter: '70',
        color: 'black',
        fontSize: 14,
        distance: 8
      },
      lineStyle: {
        width: props.markLineWidth,
        type: 'solid',
        color: '#D9001B'
      }
    }
  };
  return lineConfig;
};
const tooltipFormatter = (params) => {
  const newRow = (item) => `<p style="margin-bottom: 0">${item.marker}<span>${item.seriesName.replace(/</g, '&lt;').replace(/>/g, '&gt;')}: 
  ${item.value[item.seriesName]}%</span></p>`;
  let t = params[0].name;
  params.forEach((item) => {
    t += newRow(item);
  });
  return t;
};

watch([() => props.xData, () => props.chartData], () => {
  xAxisConfig.value.data = props.xData;
});
</script>
