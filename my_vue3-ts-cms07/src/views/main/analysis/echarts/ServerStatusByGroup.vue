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
  color: rgb(227, 229, 231); /* 设置标题颜色 */
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 60px;
}

.table {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 确保每列宽度一致 */
  gap: 1px; /* 内部格子间的轻微间距 */
  background-color: rgb(147, 189, 213); /* 外部边框颜色 */
  border: 2px solid rgb(147, 189, 213); /* 明显的外部边框 */
  border-radius: 8px;
  overflow: hidden;
}

.table-row {
  display: contents; /* 确保每个单元格平铺 */
}

.header {
  background-color: #223244;
  font-weight: bold;
}

.table-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #2e3b4e;
  color: rgb(147, 160, 176); /* 设置字体颜色 */
  white-space: nowrap; /* 禁止内容换行 */
  border-right: 1px solid rgb(147, 189, 213); /* 默认实线竖线 */
}

.dashed {
  border-right: 1px dashed rgb(147, 189, 213); /* 设置虚线竖线 */
}

.table-cell:last-child {
  border-right: none; /* 最后一列去除右边框 */
}

.status-btn {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  color: white;
}

.normal {
  background-color: rgb(0, 167, 47);
}

.disnormal {
  background-color: rgb(245, 1, 1);
}
</style>
