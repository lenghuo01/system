<script>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue'
import { connectWebsocket, destroyWebsocket, sendMessage } from '@/http/websocket.js'
import Box from './Box.vue'
export default {
  name: 'IntellectBox',
  components: {
    Box
  },
  setup() {
    onMounted(() => {
      connectWebsocket(getData)
      initChart1()
      initChart2()
    })
    const currentTime = ref([])
    const myChart1 = ref()
    const myChart2 = ref()
    const temperature = ref([])
    const isOpen1 = ref(false)
    const boxStatus = ref([1, 0, 1, 0, 1, 1, 1, 1, 0, 0])
    const boxStatus1 = ref([1, 0, 1, 0, 1, 1, 1, 1, 0, 0])
    const isPressStart = ref(false)
    const pressStatus = ref("ON")
    function initChart1() {
      const chartDom = document.getElementById('chart1');
      myChart1.value = echarts.init(chartDom);
      const option = {
        title: {
          left: 'center',
          text: '实时温度'
        },
        series: [
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            splitNumber: 12,
            itemStyle: {
              color: '#FFAB91'
            },
            progress: {
              show: true,
              width: 50
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 50
              }
            },
            axisTick: {
              distance: -65,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            splitLine: {
              distance: -72,
              length: 14,
              lineStyle: {
                width: 3,
                color: '#999'
              }
            },
            axisLabel: {
              distance: 10,
              color: '#999',
              fontSize: 20
            },
            anchor: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              width: '60%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 40,
              fontWeight: 'bolder',
              formatter: '{value} °C',
              color: 'inherit'
            },
            data: [
              {
                value: 30
              }
            ]
          },
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            itemStyle: {
              color: '#FD7347'
            },
            progress: {
              show: true,
              width: 8
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            },
            data: [
              {
                value: 30
              }
            ]
          }
        ]
      };
      myChart1.value.setOption(option);
    }
    function initChart2() {
      const chartDom = document.getElementById('chart2');
      myChart2.value = echarts.init(chartDom);
      const option = {
        title: {
          left: 'center',
          text: '实时温度曲线'
        },
        xAxis: {
          type: 'category',
          // alignTicks: true, // 对齐刻度，使得多个坐标轴的刻度对齐
          data: [1, 2, 3, 4, 5, 6],
          boundaryGap: true,
          axisTick: {
            alignWithLabel: true,
          },

          // 刻度线
          minorTick: {
            show: true,

          },
          // 次要分割线
          minorSplitLine: {
            show: true
          },
        },
        yAxis: {
          type: 'value', // 指定轴的类型为数值轴
          alignTicks: true, // 对齐刻度，使得多个坐标轴的刻度对齐
          axisLine: {
            show: true, // 显示轴线
            lineStyle: {
              type: 'solid'
              // ...
            }
          }
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
      };

      myChart2.value.setOption(option);
    }
    function getCurrentTime() {
      var now = new Date();

      var hours = now.getHours();
      var minutes = now.getMinutes();
      var seconds = now.getSeconds();

      // 小时、分钟、秒数不足两位数时前面补零
      if (hours < 10) {
        hours = '0' + hours;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (seconds < 10) {
        seconds = '0' + seconds;
      }

      var currentTime = hours + ':' + minutes + ':' + seconds;
      return currentTime;
    }
    function getPressStatus(PressStatus) {
      pressStatus.value = PressStatus
    }
    function getBoxStatus(BoxStatus){
      boxStatus.value = BoxStatus
    }
    function changePressStatus() {
      const closeJson = {
        order: "changePressStatus",
        data: "OFF"
      }
      const openJson = {
        order: "changePressStatus",
        data: "ON"
      }
      if (isPressStart.value == false) {
        sendMessage(JSON.stringify(closeJson))
        sendMessage(JSON.stringify(closeJson))
      }
      if (isPressStart.value == true) {
        sendMessage(JSON.stringify(openJson))
        sendMessage(JSON.stringify(openJson))
      }
    }
    function changeBoxStatus() {
      const arr = {
        order: "changeBoxStatus",
        data: JSON.stringify(boxStatus.value)
      }
      sendMessage(JSON.stringify(arr))
      sendMessage(JSON.stringify(arr))
      sendMessage(JSON.stringify(arr))
    }
    function getboxStatus1(data){
      boxStatus1.value = data
    }
    let count = ref(true)
    function getData(result) {
      const data = JSON.parse(result.data)
      getPressStatus(data.press_status)
      if(count.value)
      getBoxStatus(data.box_status)
      count.value = false
      getboxStatus1(data.box_status)
      temperature.value.push(data.temperature)
      currentTime.value.push(getCurrentTime())
      if (currentTime.value.length >= 100) {
        currentTime.value.shift()
        temperature.value.shift()
      }
      myChart1.value.setOption({
        series: [
          {
            data: [
              {
                value: data.temperature
              }
            ]
          },
          {
            data: [
              {
                value: data.temperature
              }
            ]
          }
        ]
      });
      myChart2.value.setOption({
        xAxis: {
          data: currentTime.value
        },
        series: [
          {
            name: '温度',
            data: temperature.value
          }
        ]
      });
    }
    return {
      isOpen1,
      boxStatus,
      pressStatus,
      isPressStart,
      boxStatus1,
      changePressStatus,
      changeBoxStatus
    }
  }
}
</script>
<template>
  <div class="container">
    <el-row>
      <el-col :span="19">
        <div style="width: 100%;height:100%;">
          <div style="display: flex;">
            <div id="chart1" style="height: 400px;width: 400px;"></div>
            <div id="chart2" style="height: 400px;width: 600px;"></div>
          </div>
          <div>
            <div style="display: flex;">
              <div style="height: 100%;width:81%;margin-left: 10px;display: flex;flex-wrap: wrap;">
                <div v-for="(item, index) in boxStatus" :key="index">
                  <div class="BoxStatus">
                    <div style="display: flex;justify-content: space-between;">
                      <div style="margin: 5%;;color: white;font-size: large;">{{ index + 1 }}号柜</div>
                      <div :class="item ? 'isOpen' : 'isClose'"></div>
                    </div>
                    <div style=" text-align: center;">
                      <el-radio-group v-model="boxStatus[index]" style="margin-bottom: 20px" @change="changeBoxStatus">
                        <el-radio-button :label="1">Open</el-radio-button>
                        <el-radio-button :label="0">Close</el-radio-button>
                      </el-radio-group>
                    </div>
                  </div>
                </div>
              </div>
              <div style="width: 15%;padding: 10px;background-color: aqua;">
                <div style="color: white;font-size: 1.5rem;text-align: center;width: 100%;">硬件设备</div>
                <div style="color: white;font-size: 1.2rem;margin: 2px;">压缩机控制：<el-switch v-model="isPressStart"
                    class="ml-2" size="large" inline-prompt @change="changePressStatus"
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" active-text="ON"
                    inactive-text="OFF" />
                </div>
                <div style="color: white;font-size: 1.2rem;">压缩机状态：<el-tag
                    :type="pressStatus === 'OFF' ? 'info' : pressStatus === 'PreStart' ? 'warning' : pressStatus === 'ON' ? 'success' : 'danger'">{{
                      pressStatus }}</el-tag>
                </div>
                <div style="text-align: center;width:calc(100% - 10px);margin: 10px;"><el-button
                    color="#626aef">设置系统参数</el-button></div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div style="width: 100%;height: 100%;">
          <Box :boxStatus1="boxStatus1"></Box>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.container {
  height: calc(100% - 20px);
  width: calc(100% - 20px);
  margin: 10px;
}

.el-row {
  height: 100%;
}

.el-col {
  height: 100%;
}

.BoxStatus {
  height: 7rem;
  width: 13rem;
  border: 1px solid;
  border-radius: 0.5rem;
  border-color: #009DF7;
  box-shadow: 0px 0px 10px 2px #009DF7;
  background-color: rgba(12, 115, 203, 0.2);
  /* 增加了透明度，0.8表示80%的不透明度 */
}

.isOpen {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: greenyellow;
  margin: 5%;
}

.isClose {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: red;
  margin: 5%;
}
</style>