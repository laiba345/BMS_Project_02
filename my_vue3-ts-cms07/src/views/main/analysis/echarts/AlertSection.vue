<template>
  <el-timeline style="max-width: 600px; height: 320px;">
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :icon="activity.icon"
      :type="activity.type"
      :color="activity.color"
      :size="activity.size"
      :hollow="activity.hollow"
      :timestamp="activity.timestamp"
    >
      {{ activity.content }}
    </el-timeline-item>
  </el-timeline>
</template>

<script lang="ts" setup>

const activities = [
  {
    content: 'Fusion 1a',
    timestamp: 'Task to_master execution failed',
    color: 'rgb(7, 106, 235)'
  },
  {
    content: 'Focsrgbu 10',
    timestamp: 'Task to_master execution failed',
    color: 'rgb(7, 106, 235)'
  },
  {
    content: 'Focsrgbu 9',
    timestamp: 'High Disk Usage exceeds 70%',
    color: 'rgb(7, 106, 235)'
  },
  {
    content: 'Focsrgbu 8',
    timestamp: 'Task to_master execution failed',
    color: 'rgb(7, 106, 235)'
  }
]
</script>


