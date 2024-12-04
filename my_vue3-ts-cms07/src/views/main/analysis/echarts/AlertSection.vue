<template>
  <div class="carousel-container">
    <div class="timeline-wrapper" ref="timelineWrapper">
      <el-timeline
        :line-style="{ type: 'dashed', color: '#FFFFFF' }"
        class="timeLine"
      >
        <el-timeline-item
          v-for="(item, index) in displayedTimelineData"
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
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

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
]);
// 为了实现无限循环，将数据复制两份
const displayedTimelineData = computed(() => {
  return [...timelineData.value, ...timelineData.value];
});

// 滚动逻辑
const timelineWrapper = ref<HTMLElement | null>(null);
let interval: any;

const startScrolling = () => {
  if (!timelineWrapper.value) return;

  let currentTransform = 0;
  // 每个时间线条目的高度
  const itemHeight = 100; 
  const totalHeight = itemHeight * timelineData.value.length;

  interval = setInterval(() => {
    currentTransform -= 1; 
    if (Math.abs(currentTransform) >= totalHeight) {
      currentTransform = -30;
    }
    timelineWrapper.value!.style.transform = `translateY(${currentTransform}px)`;
  }, 16); 
};


onMounted(() => {
  // startScrolling();
});

onBeforeUnmount(() => {
  if (interval) clearInterval(interval);
});

const customDot = (status: string) => {
  return '<span class="dot error"></span>';
};
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
  position: absolute;
  top: 0;
  left: 0;
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
  margin-bottom: 6px;
}

.status-label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 62px;
  height: 16px;
  border-radius: 4px;
  color: white;
  font-size: 12px;
}

.status-label.error {
  background-color: #ff0000;
}

.details {
  margin-top: 12px;
  margin-left: 16px;
}

.service-name {
  color: #076aeb;
  font: 500 14px Inter;
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
