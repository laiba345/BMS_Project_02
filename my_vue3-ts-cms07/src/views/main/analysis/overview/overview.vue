<template>
  <el-container>
    <!-- 顶部导航 -->
    <el-header class="dashboard-header">
      <h1>Genius Cloud</h1>
      <el-date-picker
        v-model="date"
        type="datetime"
        readonly
        placeholder="选择日期"
      />
      <el-button type="primary">退出登录</el-button>
    </el-header>

    <!-- 主体内容 -->
    <el-container>
      <el-aside width="20%" class="side-section">
        <!-- 左侧仪表和小型图表 -->
        <HDDStorage />
        <CPUUsage />
        <RAMUsage />
      </el-aside>

      <el-main class="main-section">
        <!-- 世界地图与状态统计 -->
        <MapDistribution />
      </el-main>

      <el-aside width="20%" class="side-section">
        <!-- 右侧图表与健康状态 -->
        <TestServerDistribution />
        <TestServerHealthStatus />
        <AlertSection />
      </el-aside>
    </el-container>

    <!-- 底部信息 -->
    <el-footer class="footer">
      <ServerDistribution />
      <ServerStatusByGroup />
    </el-footer>
  </el-container>
</template>

<script>
import { ref } from 'vue'
import HDDStorage from '../echarts/HDDStorage.vue'
import CPUUsage from '../echarts/CPUUsage.vue'
import RAMUsage from '../echarts/RAMUsage.vue'
import MapDistribution from '../echarts/MapDistribution.vue'
import TestServerDistribution from '../echarts/TestServerDistribution.vue'
import TestServerHealthStatus from '../echarts/TestServerHealthStatus.vue'
import ServerDistribution from '../echarts/ServerDistribution.vue'
import ServerStatusByGroup from '../echarts/ServerStatusByGroup.vue'
import AlertSection from '../echarts/AlertSection.vue'

export default {
  components: {
    HDDStorage,
    CPUUsage,
    RAMUsage,
    MapDistribution,
    TestServerDistribution,
    TestServerHealthStatus,
    ServerDistribution,
    ServerStatusByGroup,
    AlertSection
  },
  setup() {
    const date = ref(new Date())
    return { date }
  }
}
</script>

<style scoped>
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  /* background-color: #076AEB1A; */

  /* color: white; */
}

.side-section {
  padding: 10px;
  /* background-color: #1c2733; */
}

.main-section {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  /* position: fixed; */
  top: 0;
  left: 0;
  background: url('../echarts/dashboard/BackgroundOne.png') no-repeat center !important;
  background-size: cover !important;
  background-color: rgba(18, 33, 51);
  /* mask-image: url('../echarts/dashboard/BackgroundMask.png');
  mask-size: cover;
  mask-position: center; */
}

.footer {
  padding: 10px;
  background-color: #1c2733;
}
</style>
