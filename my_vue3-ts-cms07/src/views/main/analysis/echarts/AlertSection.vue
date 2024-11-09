<template>
    <el-timeline style="max-width: 600px">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :color="activity.color"
        :timestamp="activity.timestamp"
      >
        <span :style="{ color: 'rgb(8, 88, 191)' }">
          {{ activity.content }}
        </span>
        <br />
        <span :style="{ color: 'rgb(127, 134, 143)' }">
          {{ activity.timestamp }}
        </span>
      </el-timeline-item>
    </el-timeline>
  </template>
  
  <script lang="ts" setup>
  const activities = [
    {
      content: 'Fusion 1a',
      timestamp: 'Task to_master execution failed',
      color: 'rgb(7, 106, 235)',
    },
    {
      content: 'Focsrgbu 10',
      timestamp: 'Task to_master execution failed',
      color: 'rgb(7, 106, 235)',
    },
    {
      content: 'Focsrgbu 9',
      timestamp: 'High Disk Usage exceeds 70%',
      color: 'rgb(7, 106, 235)',
    },
    {
      content: 'Focsrgbu 8',
      timestamp: 'Task to_master execution failed',
      color: 'rgb(7, 106, 235)',
    },
  ];
  </script>
  
