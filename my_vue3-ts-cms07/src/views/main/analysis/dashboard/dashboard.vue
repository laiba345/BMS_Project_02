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
          <el-button type="primary" size="mini" class="fixed-width-btn">Logout</el-button>
          <el-button type="primary" size="mini" class="fixed-width-btn">Esc</el-button>
        </div>
      </el-header>

      <el-container>
        <!-- 左侧 Sidebar -->
        <el-aside width="300px" class="left-sidebar">
          <div class="panel">Core Server Usage</div>
          <div class="panel">HDD Storage</div>
          <div class="panel">CPU Usage</div>
          <div class="panel">RAM Usage</div>
        </el-aside>

        <!-- 中间主内容区 -->
        <el-main class="main-content">
          <div class="world-map">
            <!-- 中心的世界地图或其他核心内容 -->
            <p>World Map</p>
          </div>
          <div class="status-info">
            <div class="info-box">Server Distribution</div>
            <div class="info-box">Server Status By Group</div>
          </div>
        </el-main>

        <!-- 右侧 Sidebar -->
        <el-aside width="300px" class="right-sidebar">
          <div class="panel">Test Server Distribution</div>
          <div class="panel">Test Server Healthy Status</div>
          <div class="panel">Alert</div>
        </el-aside>
      </el-container>

      <!-- 底部 Footer -->
      <el-footer class="footer"> Footer Content </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
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
  onMounted(() => {
    clearInterval(timer)
  })
})
</script>

<style scoped>
.dashboard-layout {
  height: 100vh; /* 全屏布局 */
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

  .weekday {
    margin-left: 10px;
  }
  .curTime {
    font-size: larger;
    line-height: 1;
    margin-left: 5px;
  }
  .fixed-width-btn {
    width: 60px;
    margin-left: 5px;
  }
}

.left-sidebar,
.right-sidebar {
  background-color: #2a2d3e;
  padding: 10px;
  color: white;
}

.main-content {
  background-color: #1e1f2b;
  padding: 10px;
  display: flex;
  flex-direction: column;
  color: white;
}

.world-map {
  flex: 1;
  background-color: #2b2d3e;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  color: #6ab7ff;
}

.status-info {
  display: flex;
  gap: 10px;
}

.info-box {
  flex: 1;
  background-color: #3a3f51;
  padding: 20px;
  color: white;
}

.panel {
  background-color: #3a3f51;
  margin-bottom: 10px;
  padding: 15px;
  color: white;
  text-align: center;
}

.footer {
  background-color: #1c1e26;
  padding: 10px;
  color: white;
  text-align: center;
}
</style>
