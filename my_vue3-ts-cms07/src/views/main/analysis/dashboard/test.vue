xAxis: {
  type: 'category',
  data: [
    -10,
    -5,  
    0,  
    20,
    40,
    60,
    80,
    100,
    120
  ],
  axisLabel: {
    color: '#B9E8FF',
    formatter: (value: number) => {
      if (value === -10) return '10'; // 左侧刻度映射
      if (value === -5) return '5';
      return value.toString(); // 其他刻度正常显示
    }
  },
  axisLine: {
    show: true,
    lineStyle: {
      color: '#B9E8FF'
    }
  },
  axisTick: {
    alignWithLabel: true
  },
  splitLine: {
    show: true,
    lineStyle: {
      color: '#B9E8FF',
      type: 'dashed'
    }
  }
}