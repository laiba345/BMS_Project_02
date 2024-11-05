<template>
  <el-timeline>
    <el-timeline-item
      v-for="(event, index) in events"
      :key="index"
      :color="timelineNodeColor"
      placement="top"
    >
      <template #dot>
        <el-badge
          :type="event.color === 'red' ? 'danger' : 'primary'"
          :value="event.type"
          class="badge"
        ></el-badge>
      </template>
      <div class="event-title">{{ event.title }}</div>
      <div class="event-content">{{ event.description }}</div>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const timelineNodeColor = 'rgb(11, 25, 42)';

const events = ref([
  {
    type: 'Task',
    title: 'Fusion 1a',
    description: 'Task to_master execution failed',
    color: 'red',
  },
  {
    type: 'Resource',
    title: 'Focsrgbu 10',
    description: 'Task to_master execution failed',
    color: 'red',
  },
  {
    type: 'Service',
    title: 'Focsrgbu 9',
    description: 'High Disk Usage exceeds 70%',
    color: 'red',
  },
  {
    type: 'Service',
    title: 'Focsrgbu 9',
    description: 'Task to_master execution failed',
    color: 'red',
  },
]);
</script>

<style scoped>
.el-timeline-item__dot {
  /* 设置时间节点颜色 */
  background-color: rgb(7, 106, 235) !important;
}

.badge {
  margin-left: 10px; /* 与时间线的间距 */
  background-color: red;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
}

.event-title {
  font-size: 16px;
  font-weight: bold;
  color: #4e8cf9;
  margin-bottom: 4px;
}

.event-content {
  font-size: 14px;
  color: white;
}
</style>
