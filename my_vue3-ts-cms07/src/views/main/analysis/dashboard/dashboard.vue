<template>
  <div class="dashboard-layout">
    <el-container>
      <el-header class="header">
        <div class="title"></div>
        <div class="datetime">
          <span class="curDay">{{ datePart }}</span>
          <span class="weekday">{{ weekdayPart }}</span>
          <span class="curTime">{{ currentTime }}</span>
          <el-button type="primary" size="mini" class="fixed-width-btn"
            >Logout</el-button
          >
          <el-button type="primary" size="mini" class="fixed-width-btn"
            >Esc</el-button
          >
        </div>
      </el-header>

      <el-container class="MainContent">
        <el-aside style="flex-basis: 22%" class="left-sidebar">
          <div class="small-panel"></div>
          <div class="chart-panel">
            <HDDStorage />
          </div>
          <div class="chart-panel">
            <CPUUsage />
          </div>
          <div class="chart-panel">
            <RAMUsage />
          </div>
        </el-aside>

        <el-main class="main-content">
          <div class="world-map">
            <WorldChart />
          </div>
          <div class="status-info">
            <div class="info-box">
              <ServerDistribution />
            </div>
            <div class="info-box">
              <ServerStatusByGroup />
            </div>
          </div>
        </el-main>

        <el-aside style="flex-basis: 25%" class="right-sidebar">
          <div class="panel">
            <div class="small-panelOne"></div>
            <div class="chart-panel">
              <TestServerDistribution />
            </div>
          </div>

          <div class="panel">
            <div class="small-panelTwo"></div>
            <div class="chart-panel">
              <TestServerHealthStatus />
            </div>
          </div>
          <div class="panel">
            <div class="small-panelThree"></div>
            <div class="chart-panel">
              <AlertSection />
            </div>
          </div>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import HDDStorage from '../echarts/HDDStorage.vue'
import CPUUsage from '../echarts/CPUUsage.vue'
import RAMUsage from '../echarts/RAMUsage.vue'
import WorldChart from '../echarts/WorldChart.vue'
import ServerDistribution from '../echarts/ServerDistribution.vue'
import ServerStatusByGroup from '../echarts/ServerStatusByGroup.vue'
import TestServerDistribution from '../echarts/TestServerDistribution.vue'
import TestServerHealthStatus from '../echarts/TestServerHealthStatus.vue'
import AlertSection from '../echarts/AlertSection.vue'
const datePart = ref('')
const weekdayPart = ref('')
const currentTime = ref('')

const updateTime = () => {
  const now = new Date()
  const dayMap = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  ]
  datePart.value = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(
    2,
    '0'
  )}.${String(now.getDate()).padStart(2, '0')}`
  weekdayPart.value = dayMap[now.getDay()]
  currentTime.value = now.toLocaleTimeString('zh-CN', { hour12: false })
}

onMounted(() => {
  updateTime()
  const timer = setInterval(updateTime, 1000)
  onUnmounted(() => {
    clearInterval(timer)
  })
})
</script>

<style lang="less" scoped>
.dashboard-layout {
  width: 1980px;
  height: 100vh;
  position: static;
  overflow-x: hidden;
  background: url('../echarts/dashboard/BackgroundOne.png') no-repeat center
    center !important;
  background-size: cover !important;
  background-color: transparent !important;
  z-index: 9999;
  // mask-image: url('../echarts/dashboard/BackgroundMask.png');
  // mask-size: cover;
  // mask-position: center;
}

// .dashboard-layout::after {
//   content: '';
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(255, 255, 255, 0.4); /* 使用 40% 透明度白色叠加层 */
//   pointer-events: none; /* 确保叠加层不会影响点击事件 */
// }

.header {
  height: 98px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #1c1e26;
  background-image: url('../echarts/dashboard/GeniusCloudHeader.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .title {
    width: 289px;
    height: 53px;
    margin-top: 22px;
    margin-left: 20px;
    color: #edf6ff;
    font-size: 44px;
    font-weight: 700;
  }
  .datetime {
    // width: 635px;
    height: 42px;
    margin-top: 28px;
    display: flex;
    align-items: center;
    gap: 10px;
    .curDay {
      font-size: 24px;
      font-weight: 400;
      color: #acc9e6;
    }
    .weekday {
      font-size: 22px;
      font-weight: 400;
      color: #acc9e6;
    }
    .curTime {
      font-size: 36px;
      font-weight: 400;
      color: #acc9e6;
    }
    .fixed-width-btn {
      margin-left: 2px;
    }
  }
}

.left-sidebar {
  background-color: #2a2d3e;
  padding: 10px;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-x: hidden;

  .small-panel {
    position: relative;
    height: 32px;
    text-align: center;
    font-size: 14px;
    color: #edf6ff;
    // background-color: #2a2d3e;
    background-image: url('../echarts/dashboard/CoreServerUsage.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}

.right-sidebar {
  background-color: #2a2d3e;
  padding: 5px;
  // color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  // gap: 10px;
  overflow-x: hidden;
  overflow-y: auto;

  .small-panelOne {
    height: 32px;
    background-image: url('../echarts/dashboard/TestServerDistribution.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .small-panelTwo {
    height: 32px;
    background-image: url('../echarts/dashboard/TestServerHealthyStatus.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .small-panelThree {
    height: 32px;
    background-image: url('../echarts/dashboard/Alert.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}

.small-panel {
  height: 32px;
  text-align: center;
}

.chart-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3a3f51;
}

.main-content {
  // height: 100vh;
  background-color: #1e1f2b;
  padding: 10px;
  display: flex;
  flex-direction: column;
  color: white;
  overflow-x: hidden;

  .world-map {
    flex: 1;
    background-color: #2b2d3e;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    color: #6ab7ff;
    // .upMap {
    //   width: 824px;
    //   height: 459px;
    //   margin-top: 40px;
    //   margin-left: 86px;
    // }
  }
  .status-info {
    display: flex;
    gap: 10px;
    .info-box {
      flex: 1;
      background-color: #3a3f51;
      padding: 20px;
      color: white;
    }
  }
}

.footer {
  background-color: #1c1e26;
  padding: 10px;
  color: white;
  text-align: center;
}
</style>
