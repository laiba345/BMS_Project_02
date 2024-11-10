<template>
    <el-timeline :line-style="{ type: 'dashed', color: '#FFFFFF' }">
      <el-timeline-item
        v-for="(item, index) in timelineData"
        :key="index"
        :color="item.color"
        center
        :dot="customDot(item.status)"
        placement="top"
      >
        <div class="timeline-content">
          <div class="status-label" :class="item.status">{{ item.label }}</div>
          <div class="details">
            <span class="service-name">{{ item.service }}</span>
            <div class="message">{{ item.message }}</div>
          </div>
        </div>
      </el-timeline-item>
    </el-timeline>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const timelineData = ref([
    {
      label: 'Task',
      status: 'error',
      service: 'Fusion 1a',
      message: 'Task to_master execution failed',
      color: 'rgb(46, 104, 227)',
    },
    {
      label: 'Resource',
      status: 'error',
      service: 'Focsrgbu 10',
      message: 'Task to_master execution failed',
      color: 'rgb(46, 104, 227)',
    },
    {
      label: 'Service',
      status: 'error',
      service: 'Focsrgbu 9',
      message: 'High Disk Usage exceeds 70%',
      color: 'rgb(46, 104, 227)',
    },
    {
      label: 'Service',
      status: 'error',
      service: 'Focsrgbu 9',
      message: 'High Disk Usage exceeds 70%',
      color: 'rgb(46, 104, 227)',
    },
  ]);
  
  // 自定义时间线图标
  const customDot = (status: string) => {
    return '<span class="dot error"></span>';
  };
  </script>
  
  <style scoped>
  .el-timeline {
    margin-top: 30px;
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
    background-color: rgb(234, 51, 35);
  }
  
  .details {
    margin-left: 16px;
  }
  
  .service-name {
    font-size: 16px;
    color: #076aeb;
    font-weight: bold;
  }
  
  .message {
    color: #ffffff;
    margin-top: 4px;
  }
  
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #1890ff;
  }
  </style>
  