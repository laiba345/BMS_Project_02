<template>
  <div class="dashboard-layout">
    <el-container>
      <el-header class="header">
        <div class="title">Genius Cloud</div>
        <div class="datetime">
          <span class="curDay">{{ datePart }}</span>
          <span class="weekday">{{ weekdayPart }}</span>
          <span class="curTime">{{ currentTime }}</span>
          <!-- <el-button class="fixed-width-btn">Logout</el-button>
          <el-button class="fixed-width-btn">Esc</el-button> -->
          <el-dropdown placement="bottom-end">
            <el-icon :size="40" color="#FFFFFF" class="headIcon">
              <User />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-icon> <Monitor /> </el-icon>
                  <span style="margin-left: 5px">Backend Management</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-icon> <Connection /> </el-icon>
                  <span style="margin-left: 5px">Log out</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-container>
        <el-aside class="left-sidebar">
          <div class="small-panel">
            <span>Core Server usage</span>
          </div>
          <div class="chart-panel">
            <HDDStorage />
          </div>
          <div class="chart-panel">
            <CPUUsage />
          </div>
          <div class="chart-panel">
            <RAMUsage />
          </div>
          <div class="button-group">
            <button class="button left-button">G1-CISCO-FLH</button>
            <button class="button right-button">G2-PURE-FLH</button>
          </div>
        </el-aside>

        <el-main class="main-content">
          <div class="world-map">
            <div class="map-box">
              <WorldChart />
            </div>
            <div class="map-info-box">
              <span class="info-item"
                >Normal<span class="number normal">2000</span></span
              >
              <span class="info-item"
                >Abnormal<span class="number abnormal">12</span></span
              >
              <span class="info-item"
                >Offline<span class="number offline">9</span></span
              >
            </div>
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

        <el-aside style="flex-basis: 24%" class="right-sidebar">
          <div class="panel">
            <div class="small-panelOne">
              <span>Test Server Distributon</span>
            </div>
            <div class="chart-panel">
              <TestServerDistribution />
            </div>
          </div>

          <div class="panel">
            <div class="small-panelOne">
              <span>Test Server Healthy Status</span>
            </div>
            <div class="chart-panel">
              <TestServerHealthStatus />
            </div>
          </div>
          <div class="panel">
            <div class="small-panelOne">
              <span>Alert</span>
            </div>
            <div class="chart-panel">
              <AlertSection />
            </div>
          </div>
        </el-aside>
      </el-container>
      <el-footer>
        <div class="footer"></div>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import HDDStorage from '../echarts/HDDStorage.vue'
import CPUUsage from '../echarts/CPUUsage.vue'
// import CPUUsage from '../echarts/CPUUsageAgain.vue';
import RAMUsage from '../echarts/RAMUsage.vue'
import WorldChart from '../echarts/WorldChart.vue'
import ServerDistribution from '../echarts/ServerDistribution.vue'
import ServerStatusByGroup from '../echarts/ServerStatusByGroup.vue'
import TestServerDistribution from '../echarts/TestServerDistribution.vue'
import TestServerHealthStatus from '../echarts/TestServerHealthStatus.vue'
import AlertSection from '../echarts/AlertSection.vue'
import { Connection } from '@element-plus/icons-vue'
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
  width: 100%;
  height: 100vh !important;
  overflow-x: hidden;
  background: #0a0f14 url('../echarts/dashboard/BackgroundOne.png') no-repeat 0
    0 / 100% 100%;
}

.header {
  height: 76px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background: url('../echarts/dashboard/HeadBg.png') no-repeat 0 0 / 100% 100%;
  //  no-repeat center/cover
  .title {
    width: 28.9vw;
    height: 5.5vh;
    margin: 1vh 0 0 0.6vw;
    color: #edf6ff;
    font-size: 36px;
    font-weight: 700;
  }
  .datetime {
    height: 6.3vh;
    margin: 0.6vh 1.2vw 0 0;
    display: flex;
    align-items: center;
    gap: 10px;
    .curDay {
      font: 400 24px Inter;
      color: #acc9e6;
    }
    .weekday {
      margin-left: 10px;
      font: 400 22px Inter;
      color: #acc9e6;
    }
    .curTime {
      margin-top: -3px;
      margin-left: 10px;
      font: 400 34px Inter;
      color: #acc9e6;
    }
    // .fixed-width-btn {
    //   width: 73px;
    //   font: 400 14px Inter;
    //   margin-left: 10px;
    //   color: #ffffff;
    //   border: 1px solid rgba(7, 106, 235, 1);
    //   background-color: rgba(7, 106, 235, 0.6);
    // }
    .headIcon {
      margin-left: 10px;
    }
    .headIcon:hover {
      cursor: pointer;
    }
  }
}

.left-sidebar {
  height: 100%;
  width: 24vw;
  padding: 10px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
 
  .small-panel {
    margin-top: 3px;
    height: 30px;
    background: url('../echarts/dashboard/CoreServerUsageTwo.png') no-repeat
      center/cover;
      span {
      display: inline-block; 
      height: 30px; 
      margin: 0.41vh 0 0 0.6vw;
      color: #edf6ff;
      font-size: 16px;
      font-weight: 700;
    }
  }

  .chart-panel {
  }

  .button-group {
    display: flex;
    align-items: center;
    .button {
      width: 92px;
      height: 16px;
      color: #ffffff;
      font-size: 10px;
      font-weight: 400;
      cursor: pointer;
      border: none;
      outline: none;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background-color 0.2s, transform 0.1s;
    }
    .left-button {
      background-color: rgba(7, 106, 235, 0.5);
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      border-right: 1px solid transparent;
    }
    .right-button {
      background-color: rgba(7, 106, 235, 0.3);
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      border-left: 1px solid transparent;
    }
    .button:active {
      transform: scale(0.95);
    }
  }
}

.main-content {
  height: 100%;
  padding: 10px;
  gap: 32px;
  display: flex;
  flex-direction: column;

  color: #ffffff;
  overflow: hidden;

  .world-map,
  .status-info {
    width: 100%;
  }

  .world-map {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 550px;
    // margin-top: 5px;
    background: url('../echarts/dashboard/MapThree.png') no-repeat 0 0 / 100%
      100%;
    // background-size: cover;
    .map-box {
      width: 824px;
      height: 459px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .map-info-box {
      width: 528px;
      height: 31px;
      display: flex;
      margin-left: 40px;
      align-items: center;
      justify-content: space-between;
      border-radius: 5px;
      color: #ffffff;
      .info-item {
        display: flex;
        align-items: center;
        font: 400 14px Inter;
        .number {
          font: 500 28px Aldrich;
          font-family: 'Segoe UI', sans-serif;
          line-height: 31.3px;
          margin-left: 24px;
        }
      }
      .normal {
        color: #00a72f;
      }

      .abnormal {
        color: #ff0000;
      }

      .offline {
        color: #febc22;
      }
    }
  }
  .status-info {
    display: flex;
    margin-top: -20px;
    gap: 20px;
    .info-box {
      flex: 1;
      background-color: rgba(7, 106, 235, 0.1);
      padding: 10px;
      color: #ffffff;
    }
  }
}

.right-sidebar {
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .small-panelOne {
    height: 30px;
    margin-bottom: 5px;
    background: url('../echarts/dashboard/TestServerDistributionTwo.png')
      no-repeat center/cover;
    span {
      display: inline-block; 
      height: 30px; 
      margin: 0.41vh 0 0 0.6vw;
      color: #edf6ff;
      font-size: 16px;
      font-weight: 700;
    }
  }
  // .small-panelTwo {
  //   height: 30px;
  //   margin-bottom: 10px;
  //   background: url('../echarts/dashboard/TestServerHealthyStatus.png')
  //     no-repeat center/cover;
  // }
  // .small-panelThree {
  //   height: 30px;
  //   margin-bottom: 6px;
  //   background: url('../echarts/dashboard/Alert.png') no-repeat center/cover;
  // }
  .panel:nth-of-type(1) .chart-panel {
    width: 100%;
    height: 210px;
  }
  .panel:nth-of-type(2) .chart-panel {
    height: 250px;
  }
  .panel:nth-of-type(3) .chart-panel {
    height: 210px;
  }
}

.footer {
  width: 100%;
  height: 17px;
  margin-bottom: 20px;
  color: #ffffff;
  text-align: center;
  background: url('../echarts/dashboard/footer.png') no-repeat 0 0 / 100% 100%;
}

::v-deep .el-footer {
  --el-footer-padding: 0 10px;
  --el-footer-height: 20px;
}
</style>
