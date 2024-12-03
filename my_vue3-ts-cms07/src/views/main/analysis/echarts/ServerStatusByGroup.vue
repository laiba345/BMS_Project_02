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
          <span
            :class="{
              'status-btn': true,
              normal: row.status1 === 'Normal',
              disnormal: row.status1 === 'Disnormal'
            }"
          >
            {{ row.status1 }}
          </span>
        </div>
        <div class="table-cell">{{ row.groupName2 }}</div>
        <div class="table-cell dashed">
          <span
            :class="{
              'status-btn': true,
              normal: row.status2 === 'Normal',
              disnormal: row.status2 === 'Disnormal'
            }"
          >
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
  {
    groupName1: 'G1-CISCO-FLH',
    status1: 'Disnormal',
    groupName2: 'G5-PURE-FSJ',
    status2: 'Disnormal'
  },
  {
    groupName1: 'G2-PURE-FLH',
    status1: 'Normal',
    groupName2: 'G7-DCN-FVN',
    status2: 'Normal'
  },
  {
    groupName1: 'G3-PURE_FJZ',
    status1: 'Disnormal',
    groupName2: 'G8-CISCO-FJZ',
    status2: 'Disnormal'
  },
  {
    groupName1: 'G4-CISCO-FVN',
    status1: 'Normal',
    groupName2: 'G9-PURE-FVN',
    status2: 'Normal'
  }
]);
</script>

<style scoped>
.status-table {
  height: 150px; 
  text-align: left;
  color: white;
  font-family: Arial, sans-serif;
}

.table-title {
  color: #ffffff;
  font-size: 13px; 
  font-weight: 600;
  margin-bottom: 30px;
}

.table {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border: 1px solid #b9e8ff;
  border-bottom: none;
  border-radius: 8px;
  overflow: hidden;
}

.table-row {
  display: contents;
}

.header .table-cell {
  font-size: 12px; 
  line-height: 1.2;
  padding: 7px 9px; 
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(65, 123, 214, 0.19);
  font-weight: 500;
  border-bottom: 1px solid #b9e8ff;
}

.table-row:not(.header) .table-cell {
  font-size: 10px; 
  line-height: 1.2; 
  padding: 6px 8px; 
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fffffe;
  border-bottom: 1px solid #b9e8ff;
}

.table-cell {
  white-space: nowrap;
  border-right: 1px dashed rgba(185, 232, 255, 0.4);
}
.dashed {
  border-right: 1px solid #b9e8ff;
}

.table-cell:last-child {
  border-right: none;
}

.status-btn {
  display: inline-block;
  padding: 2px 6px; 
  border-radius: 4px;
  font-size: 10px; 
  font-weight: 400;
  color: #ffffff;
}

.normal {
  background-color: #00a72f;
}

.disnormal {
  background-color: #ff0000;
}
</style>

