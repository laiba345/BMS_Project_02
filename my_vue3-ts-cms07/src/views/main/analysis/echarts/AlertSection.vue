<template>
  <div class="carousel-container">
    <div
      class="timeline-wrapper"
      :style="{ transform: `translateY(${offset}px)` }"
    >
      <el-timeline
        :line-style="{ type: 'dashed', color: '#FFFFFF' }"
        class="timeLine"
      >
        <el-timeline-item
          v-for="(item, index) in visibleData"
          :key="index"
          :color="item.color"
          center
          :dot="customDot(item.status)"
          placement="top"
        >
          <div class="timeline-content">
            <div class="status-label" :class="item.status">
              {{ item.label }}
            </div>
            <div class="details">
              <span class="service-name">{{ item.service }}</span>
              <div class="message">{{ item.message }}</div>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

// 时间线数据
const timelineData = ref([
  {
    label: 'Task',
    status: 'error',
    service: 'Fusion 1',
    message: 'Task to_master execution failed',
    color: 'rgb(46, 104, 227)',
  },
  {
    label: 'Resource',
    status: 'error',
    service: 'Focsrgbu 2',
    message: 'Task to_master execution failed',
    color: 'rgb(46, 104, 227)',
  },
  {
    label: 'Service',
    status: 'error',
    service: 'Focsrgbu 3',
    message: 'High Disk Usage exceeds 70%',
    color: 'rgb(46, 104, 227)',
  },
  {
    label: 'Service',
    status: 'error',
    service: 'Focsrgbu 4',
    message: 'High Disk Usage exceeds 70%',
    color: 'rgb(46, 104, 227)',
  },
  {
    label: 'Task',
    status: 'error',
    service: 'Fusion 5',
    message: 'Task to_master execution failed',
    color: 'rgb(46, 104, 227)',
  },
  {
    label: 'Resource',
    status: 'error',
    service: 'Focsrgbu 6',
    message: 'Task to_master execution failed',
    color: 'rgb(46, 104, 227)',
  },
  {
    label: 'Service',
    status: 'error',
    service: 'Focsrgbu 7',
    message: 'High Disk Usage exceeds 70%',
    color: 'rgb(46, 104, 227)',
  },
  {
    label: 'Service',
    status: 'error',
    service: 'Focsrgbu 8',
    message: 'High Disk Usage exceeds 70%',
    color: 'rgb(46, 104, 227)',
  },
]);

// 自定义点
const customDot = (status: string) => {
  return '<span class="dot error"></span>';
};

const offset = ref(0); // 滚动偏移量
const itemHeight = 90; // 每个时间线项的高度
const scrollStep = -2; // 每次滚动的像素偏移量
let interval: ReturnType<typeof setInterval> | null = null;

const visibleCount = Math.ceil(window.innerHeight / itemHeight) + 1; // 可视范围内最多显示的条目数
const startIndex = ref(0); // 当前渲染数据的起始索引

// 计算可见数据
const visibleData = computed(() => {
  const data = timelineData.value.concat(timelineData.value); // 拼接数据模拟无限滚动
  const endIndex = (startIndex.value + visibleCount) % data.length;
  if (startIndex.value < endIndex) {
    return data.slice(startIndex.value, endIndex);
  } else {
    return [...data.slice(startIndex.value), ...data.slice(0, endIndex)];
  }
});

// 开始滚动
const startCarousel = () => {
  interval = setInterval(() => {
    offset.value += scrollStep;

    // 当偏移量超过一个条目高度时，更新索引
    if (Math.abs(offset.value) >= itemHeight) {
      offset.value = 0; // 重置偏移量（单个条目内的滚动）
      startIndex.value = (startIndex.value + 1) % timelineData.value.length; // 更新起始索引
    }
  }, 25); 
};

onMounted(() => {
  startCarousel();
});

onBeforeUnmount(() => {
  if (interval) {
    clearInterval(interval);
  }
});

</script>

<style scoped>
.carousel-container {
  width: 100%;
  height: 100%;
  background-color: rgb(7, 106, 235, 0.1);
  overflow: hidden;
  position: relative;
}

.timeline-wrapper {
  margin-left: 30px;
  will-change: transform;
}

::v-deep .el-timeline-item__tail {
  position: absolute;
  left: 4px;
  height: 100%;
  border-left: 1px dashed rgba(255, 255, 255, 0.6);
}

.timeLine {
  width: 100%;
  height: auto;
}

.timeline-content {
  display: flex;
  align-items: center;
}

.status-label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 82px;
  height: 17px;
  border-radius: 4px;
  color: white;
  font-size: 14px;
}

.status-label.error {
  background-color: #ff0000;
}

.details {
  margin-top: 14px;
  margin-left: 16px;
}

.service-name {
  color: #076aeb;
  font: 500 16px Inter;
}

.message {
  color: #ffffff;
  font: 400 12px Inter;
  margin-top: 2px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #1890ff;
}
</style>
