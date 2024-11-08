<template>
  <div class="dashboard-layout">
    <el-container>
      <!-- 顶部 Header -->
      <el-header class="header">
        <div class="title">Genius Cloud</div>
        <div class="datetime">
          <span>{{ datePart }}</span>
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

      <el-container>
        <!-- 左侧 Sidebar -->
        <el-aside style="flex-basis: 22%" class="left-sidebar">
          <div class="panel small-panel">Core Server Usage</div>
          <div class="panel chart-panel">
            <HDDStorage />
          </div>
          <div class="panel chart-panel">
            <CPUUsage />
          </div>
          <div class="panel chart-panel">
            <RAMUsage />
          </div>
        </el-aside>

        <!-- 中间主内容区 -->
        <el-main class="main-content">
          <div class="world-map">
            <!-- 中心的世界地图或其他核心内容 -->
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

        <!-- 右侧 Sidebar -->
        <el-aside style="flex-basis: 25%" class="right-sidebar">
          <!-- 第一个图组件和标题 -->
          <div class="panel">
            <div class="small-panel">Test Server Distribution</div>
            <div class="chart-panel">
              <TestServerDistribution />
            </div>
          </div>

          <!-- 第二个图组件和标题 -->
          <div class="panel">
            <div class="small-panel">Test Server Healthy Status</div>
            <div class="chart-panel">
              <TestServerHealthStatus />
            </div>
          </div>

          <!-- 第三个图组件和标题 -->
          <div class="panel">
            <div class="small-panel">Alert</div>
            <div class="chart-panel">
              <AlertSection />
            </div>
          </div>
        </el-aside>
      </el-container>

      <!-- 底部 Footer -->
      <!-- <el-footer class="footer"> Footer Content </el-footer> -->
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
  height: 100vh;
  overflow-x: hidden;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #1c1e26;
  color: white;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.datetime {
  display: flex;
  align-items: center;
  gap: 10px;
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
}

.right-sidebar {
  background-color: #2a2d3e;
  padding: 10px;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-x: hidden;
  overflow-y: auto;
}

.small-panel {
  height: 30px;
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
  }

  .info-box {
    flex: 1;
    background-color: #3a3f51;
    padding: 20px;
    color: white;
  }
}

.status-info {
  display: flex;
  gap: 10px;
}

.footer {
  background-color: #1c1e26;
  padding: 10px;
  color: white;
  text-align: center;
}
</style>


上述的页面布局，在最右边可能是因为每个子组件高度太高撑开了，导致最右边