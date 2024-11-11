<template>
    <div class="status-table">
      <h2 class="table-title">Server Status By Group</h2>
      <div class="table">
        <div class="table-row header">
          <div class="table-cell">Group Name</div>
          <div class="table-cell dashed">Status</div>
          <div class="table-cell">Group Name</div>
          <div class="table-cell dashed">Status</div>
        </div>
        <div v-for="(row, index) in tableData" :key="index" class="table-row">
          <div class="table-cell">{{ row.groupName1 }}</div>
          <div class="table-cell dashed">
            <span :class="{'status-btn': true, 'normal': row.status1 === 'Normal', 'disnormal': row.status1 === 'Disnormal'}">
              {{ row.status1 }}
            </span>
          </div>
          <div class="table-cell">{{ row.groupName2 }}</div>
          <div class="table-cell dashed">
            <span :class="{'status-btn': true, 'normal': row.status2 === 'Normal', 'disnormal': row.status2 === 'Disnormal'}">
              {{ row.status2 }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const tableData = ref([
    { groupName1: 'G1-CISCO-FLH', status1: 'Disnormal', groupName2: 'G5-PURE-FSJ', status2: 'Disnormal' },
    { groupName1: 'G2-PURE-FLH', status1: 'Normal', groupName2: 'G7-DCN-FVN', status2: 'Normal' },
    { groupName1: 'G3-PURE_FJZ', status1: 'Disnormal', groupName2: 'G8-CISCO-FJZ', status2: 'Disnormal' },
    { groupName1: 'G4-CISCO-FVN', status1: 'Normal', groupName2: 'G9-PURE-FVN', status2: 'Normal' }
  ]);
  </script>
  
  <style scoped>
  .status-table {
    height: 200px; 
    text-align: left;
    color: white;
    font-family: Arial, sans-serif;
  }
  
  .table-title {
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 60px;
  }
  
  .table {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background-color: rgb(147, 189, 213);
    border: 2px solid rgb(147, 189, 213);
    border-radius: 8px;
    overflow: hidden;
  }
  
  .table-row {
    display: contents;
  }
  
  /* 表头样式 */
  .header .table-cell {
    font-size: 14px;
    line-height: 1.5;
    padding: 8px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #223244;
    font-weight: bold;
  }
  
  /* 表格内容行样式 */
  .table-row:not(.header) .table-cell {
    font-size: 12px;
    line-height: 1.5;
    padding: 6px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2e3b4e;
    color: rgb(147, 160, 176);
  }
  
  /* 单元格通用样式 */
  .table-cell {
    white-space: nowrap;
    border-right: 1px solid rgb(147, 189, 213);
  }
  
  /* 虚线边框 */
  .dashed {
    border-right: 1px dashed rgb(147, 189, 213);
  }
  
  /* 最后一列去除右边框 */
  .table-cell:last-child {
    border-right: none;
  }
  
  /* 状态按钮样式 */
  .status-btn {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: bold;
    color: white;
  }
  
  /* 正常状态样式 */
  .normal {
    background-color: rgb(0, 167, 47);
  }
  
  /* 异常状态样式 */
  .disnormal {
    background-color: rgb(245, 1, 1);
  }
  </style>
  