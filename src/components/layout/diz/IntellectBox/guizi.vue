<script>
import * as echarts from 'echarts';
import { onMounted, ref, onUnmounted, markRaw,watch } from 'vue'
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
      // 在这里访问 this.$refs
      // 开始监听最外层的 resizeTarget 元素的大小变化
      initChart1()
      initChart2()
      resizeObserver.observe(resizeTarget.value); // 开始监听 resizeTarget 元素的大小变化
    })
    onUnmounted(() => {
      resizeObserver.disconnect(); // 组件销毁时停止监听，防止内存泄漏
    });
    const currentTime = ref([])
    const myChart1 = ref()
    const myChart2 = ref()
    const temperature = ref([])
    const isOpen1 = ref(false)
    const boxStatus = ref([1, 0, 1, 0, 1, 1, 1, 1, 0, 0])
    const boxStatus1 = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const isPressStart = ref(false)
    const pressStatus = ref("ON")
    const resizeTarget = ref(null); // 创建一个ref用于存储DOM元素引用
    const chartHeight = ref(1)
    const chartWidth = ref(1)
    const devide_code = ref('1111111111')
    const deviceAddr = ref('1')
    const postTime = ref('1')
    const startDelay = ref('2')
    const timeOffline = ref('20')
    const temDiff = ref('5')

    const resizeObserver = new ResizeObserver(entries => {
      // entries 是一个 ResizeObserverEntry 对象数组，包含目标元素的大小信息
      for (const entry of entries) {
        let { width, height } = entry.contentRect
        // 根据外部盒子的宽度来设置echarts图的宽度
        if (width != 0 && height != 0) {
          chartHeight.value = height / 2
          chartWidth.value = width
          myChart1.value.resize({
            width: chartWidth.value,
            height: chartHeight.value
          });
          myChart2.value.resize({
            width: chartWidth.value,
            height: chartHeight.value
          });
        }
      }
    })

    function initChart1() {
      const chartDom = document.getElementById('chart1');
      myChart1.value = echarts.init(chartDom);

      // 模拟温度数据
      const temperature = 30; // 假设当前温度为30°C
      const minTemperature = 0; // 最低温度
      const maxTemperature = 60; // 最高温度

      // 计算颜色插值
      const colorLow = '#5DADE2'; // 低温时的颜色，这里使用了淡蓝色
      const colorHigh = '#00ffff';
      const color = getColorForTemperature(temperature, minTemperature, maxTemperature, colorLow, colorHigh);

      const option = {
        title: {
          left: 'center',
          text: '实时温度',
          textStyle: {
            color: '#00ffff',  // 标题文字颜色
            fontSize: 20
          }
        },

        series: [
          {
            type: 'gauge',
            center: ['50%', '70%'],
            startAngle: 200,
            endAngle: -20,
            min: minTemperature,
            max: maxTemperature,
            splitNumber: 12,
            itemStyle: {
              color: color
            },

            progress: {
              show: true,
              width: 20
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 20
              }
            },
            axisTick: {
              distance: -35,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: '#00ffff'
              }
            },
            splitLine: {
              distance: -42,
              length: 14,
              lineStyle: {
                width: 3,
                color: '#00ffff'
              }
            },
            axisLabel: {
              distance: -15,
              color: '#00ffff',
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
              width: '70%',
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
                value: temperature
              }
            ]
          },
          {
            type: 'gauge',
            center: ['50%', '70%'],
            startAngle: 200,
            endAngle: -20,
            min: minTemperature,
            max: maxTemperature,
            itemStyle: {
              color: '#00ffff' // 固定第二个指针的颜色，这里使用了青色
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
                value: temperature
              }
            ]
          }
        ]
      };

      myChart1.value.setOption(option);
    }

    // 根据温度值计算颜色
    function getColorForTemperature(value, min, max, lowColor, highColor) {
      const range = max - min;
      const ratio = (value - min) / range;
      const color = interpolateColor(lowColor, highColor, ratio);
      return color;
    }

    // 插值计算颜色
    function interpolateColor(color1, color2, ratio) {
      const r1 = parseInt(color1.slice(1, 3), 16);
      const g1 = parseInt(color1.slice(3, 5), 16);
      const b1 = parseInt(color1.slice(5, 7), 16);
      const r2 = parseInt(color2.slice(1, 3), 16);
      const g2 = parseInt(color2.slice(3, 5), 16);
      const b2 = parseInt(color2.slice(5, 7), 16);

      const r = Math.round(r1 + (r2 - r1) * ratio);
      const g = Math.round(g1 + (g2 - g1) * ratio);
      const b = Math.round(b1 + (b2 - b1) * ratio);

      return `rgb(${r},${g},${b})`;
    }

    function initChart2() {
      myChart2.value = markRaw(echarts.init(document.getElementById('chart2')));
      const option = {
        title: {
          left: 'center',
          text: '实时温度曲线',
          textStyle: {
            color: '#00ffff',  // 标题文字颜色
            fontSize: 20,
          }
        },
        grid: {
          bottom: 40
        },
        xAxis: {
          type: 'category',
          data: [1, 2, 3, 4, 5, 6],
          boundaryGap: true,
          axisTick: {
            alignWithLabel: true,
          },
          minorTick: {
            show: true,
          },
          minorSplitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(0, 255, 255, 0.2)'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#00ffff'  // X轴颜色
            }
          },
          axisLabel: {
            color: '#00ffff'  // X轴标签颜色
          }
        },
        yAxis: {
          type: 'value',
          alignTicks: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#00ffff'  // Y轴颜色
            }
          },
          axisLabel: {
            color: '#00ffff'  // Y轴标签颜色
          }
        },
        series: [
          {
            data: [20, 32, 41, 34, 32, 23, 20],
            type: 'line',
            smooth: true,
            lineStyle: {
              width: 3,
              color: '#00CED1'  // 使用明亮的蓝青色
            },
            itemStyle: {
              color: '#00CED1'  // 使用明亮的蓝青色
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0, 206, 209, 0.8)'  // 顶部颜色，明亮的蓝青色
              }, {
                offset: 1,
                color: 'rgba(0, 206, 209, 0.1)'  // 底部颜色，明亮的蓝青色
              }])
            }
          }
        ],
        //backgroundColor: 'rgba(255, 255, 255, 0.1)',  // 背景颜色
        textStyle: {
          color: '#00ffff'  // 白色文字
        }
      };

      myChart2.value.setOption(option);

      // 设置图表容器的样式
    }

    function throttle(func, wait) {
      let lastTime = 0;
      return function (...args) {
        const now = new Date().getTime();
        if (now - lastTime > wait) {
          lastTime = now;
          return func.apply(this, args);
        }
      };
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
      if (pressStatus.value == 'ON') pressStatus1.value = '开启'
      else if (pressStatus.value == 'PreStart') pressStatus1.value = '预启动'
      else if (pressStatus.value == 'OFF') pressStatus1.value = '关机'
      else if (pressStatus.value == 'FAULT') pressStatus1.value = '故障'
    }
    function getBoxStatus(BoxStatus) {
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
      if (pressStatus.value == 'ON') {
        sendMessage(JSON.stringify(closeJson))
        sendMessage(JSON.stringify(closeJson))
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
    function getboxStatus1(data) {
      boxStatus1.value = data
    }
    function setDevice() {
      const obj = {
        order: "changeDeviceStatus",
        devide_code: devide_code.value,
        deviceAddr: deviceAddr.value,
        postTime: postTime.value,
        startDelay: startDelay.value,
        tempOffline: timeOffline.value,
        tempDiff: temDiff.value
      }
      sendMessage(JSON.stringify(obj))
      throttledGetCurrentTime.value= throttle(delay, postTime.value*1000);
    }
    function delay(data){
      temperature.value.push(data)
      currentTime.value.push(getCurrentTime())
      if (currentTime.value.length >= 100) {
        currentTime.value.shift()
        temperature.value.shift()
      }
    }
    const throttledGetCurrentTime = ref()
    throttledGetCurrentTime.value= throttle(delay, postTime.value*1000);
    watch(()=>postTime.value, (newValue, oldValue) => {
        console.log(newValue)
       // 使用节流函数包装 getCurrentTime
       
      }, {
        immediate: true,
        deep: true
      });
    
    let count = ref(true)
    const tempDiff1 = ref(10)
    const deviceAddr1 = ref(10)
    const timeOffline1 = ref(10)
    const pressStatus1 = ref('关机')
    function getData(result) {
      const data = JSON.parse(result.data)
      getPressStatus(data.press_status)
      if (count.value)
        getBoxStatus(data.box_status)
      count.value = false
      getboxStatus1(data.box_status)
      tempDiff1.value = data.temp_diff
      timeOffline1.value = data.temp_offline
      deviceAddr1.value = data.device_addr
      // deviceAddr1.value = data.
      throttledGetCurrentTime.value(data.temperature)
     
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
      pressStatus1,
      isPressStart,
      boxStatus1,
      changePressStatus,
      changeBoxStatus,
      resizeTarget,
      chartHeight,
      chartWidth,
      devide_code,
      deviceAddr,
      deviceAddr1,
      postTime,
      startDelay,
      timeOffline,
      timeOffline1,
      temDiff,
      setDevice,
      tempDiff1
    }
  }
}
</script>
<template>
  <div class="container01">
    <div class="title">快递柜控制</div>
    <div class="container">

      <div ref="resizeTarget" class="module">
        <div id="chart1" :style="{ height: chartHeight + 'px', width: chartWidth + 'px' }"></div>
        <div id="chart2" :style="{ height: chartHeight + 'px', width: chartWidth + 'px' }"></div>
      </div>

      <div class="module">
        <div style="height: 70%;width: 100%;display: flex;justify-content: space-around;align-items: center;">
          <div style="width: 25%;">
            <div id="square1" class="square">
              <div class="label"></div>
              <div class="temperature-container">
               
                <span class="unit">{{ timeOffline1 }}</span>
              </div>
              <div class="icon-container">
                <div class="icon"></div>
              </div>
            </div>
            <div id="square2" class="square">
              <div class="label"></div>
              <div class="temperature-container">
               
                <span class="unit">{{ pressStatus1 }}</span>
              </div>
              <div class="icon-container">
                <div class="icon"></div>
              </div>
            </div>
            <div id="square3" class="square">
              <div class="label"></div>
              <div class="temperature-container">
                <span class="temperature"></span>
                <span class="unit">{{ postTime }}</span>
              </div>
              <div class="icon-container">
                <div class="icon"></div>
              </div>
            </div>
          </div>
          <Box :boxStatus1="boxStatus1"></Box>
          <div style="width: 26%">
            <div id="square4" class="square">
              <div class="label"></div>
              <div class="temperature-container">
                <span class="temperature"></span>
                <span class="unit">{{ tempDiff1 }}</span>
              </div>
              <div class="icon-container">
                <div class="icon"></div>
              </div>
            </div>
            <div id="square5" class="square">
              <div class="label"></div>
              <div class="temperature-container">
                <span class="temperature"></span>
                <span class="unit">{{ startDelay }}</span>
              </div>
              <div class="icon-container">
                <div class="icon"></div>
              </div>
            </div>
            <div id="square6" class="square">
              <div class="label"></div>
              <div class="temperature-container">
                <span class="temperature"></span>
                <span class="unit">{{ deviceAddr }}</span>
              </div>
              <div class="icon-container">
                <div class="icon"></div>
              </div>
            </div>
          </div>
        </div>

        <div style="height: 30%;width:100%;display: flex;flex-wrap: wrap;justify-content: center;">
          <div v-for="(item, index) in boxStatus" :key="index">
            <div class="BoxStatus">
              <div style="display: flex;justify-content: space-between;">
                <div style="margin: 5%;color: white;font-size: small;">{{ index + 1 }}号柜</div>
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
      </div>
      <div class="module">\
        <div class="form-container">
          <div class="input-group">
            <label for="deviceCode">设备编码:</label>
            <input type="text" id="deviceCode" placeholder="设备编码" v-model="devide_code">
          </div>
          <div class="input-group">
            <label for="deviceAddress">设备地址:</label>
            <input type="text" id="deviceAddress" placeholder="设备地址" v-model="deviceAddr">
          </div>
          <div class="input-group">
            <label for="collectionInterval">采集间隔:</label>
            <input type="number" id="collectionInterval" placeholder="采集间隔 (秒)" v-model="postTime">
          </div>
          <div class="input-group">
            <label for="startDelay">启动延迟:</label>
            <input type="number" id="startDelay" placeholder="启动延迟 (秒)" v-model="startDelay">
          </div>
          <div class="input-group">
            <label for="delayTime">设定温度:</label>
            <input type="number" id="temperatureSetup" placeholder="设定温度 ((℃))" v-model="timeOffline">
          </div>
          <div class="input-group">
            <label for="temperatureControl">温差控制:</label>
            <input type="text" id="temperatureControl" placeholder="温差控制 (℃)" v-model="temDiff">
          </div>
          <button @click="setDevice()">设置参数</button>
          <button @click="changePressStatus()">关闭压缩机</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container01 {
  margin: 0;
  font-family: 'Arial', sans-serif;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(180deg, #004e92, #000428);
  overflow: hidden;
  color: #fff;
}

.title {
  padding-top: 10px;
  font-size: 3rem;
  color: white;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.5);
}

.container {
  display: flex;
  width: 100%;
  height: calc(100% - 58px);
  flex: 1;
}

.module {
  flex-grow: 1;
  border: 2px solid rgba(0, 255, 255, 0.5);
  border-radius: 15px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  position: relative;
}

.module:nth-child(1) {
  flex: 1;
}

.module:nth-child(2) {
  flex: 1.618;
}

.module:nth-child(3) {
  flex: 1;
}

/* .module:nth-child(2)::before {
  content: '';
  position: absolute;
  left: 0;
  top: 61.8%;
  width: 100%;
  height: 2px;
  background: rgba(0, 255, 255, 0.5);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
} */


@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}


/* body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: linear-gradient(180deg, #004e92, #000428);
    overflow: hidden;
    color: #fff;
} */

.BoxStatus {
  height: 5rem;
  width: 8rem;
  border: 1px solid;
  border-radius: 0.5rem;
  border-color: #009DF7;
  box-shadow: 0px 0px 10px 2px #009DF7;
  background-color: rgba(12, 115, 203, 0.2);
  /* 增加了透明度，0.8表示80%的不透明度 */
}

.isOpen {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: greenyellow;
  margin: 5%;
}

.isClose {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: red;
  margin: 5%;
}

::v-deep(.el-radio-button__inner) {
  width: 40px;
  height: 30px;
  font-size: small;
  text-align: center;
  padding: 10px 0px 0px 0px;
  background: #F7F8FA;
  color: #333;
  border: 0 !important;
}

.square {
  width: 100px;
  height: 100px;
  border: 1px solid rgb(217, 231, 252);
  border-radius: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  margin: 15px;
}

.label {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 12px;
  color: white;
}

.temperature-container {
  display: flex;
  align-items: baseline;
  color: white;
  position: absolute;
  top: 25px;
  right: 5px;
}

.temperature {
  font-size: 18px;
  font-weight: bold;
}

.unit {
  font-size: 18px;
  font-weight: bold;
}

.icon-container {
  position: absolute;
  bottom: 8px;
  left: 8px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 24px;
  height: 24px;
  background-size: contain;
  background-repeat: no-repeat;
}

/* Specific styles for each square */
#square1 {
  background-color: #FFA07A;
}

#square2 {
  background-color: #7FFFD4;
}

#square3 {
  background-color: #8A2BE2;
}

#square4 {
  background-color: #FF6347;
}

#square5 {
  background-color: #4682B4;
}

#square6 {
  background-color: #FFD700;
}

#square1 .label::after {
  content: '设置温度';
}

#square2 .label::after {
  content: '压缩机状态';
}

#square3 .label::after {
  content: '采集间隔';
}

#square4 .label::after {
  content: '温差设置';
}

#square5 .label::after {
  content: '延迟时长';
}

#square6 .label::after {
  content: '设备地址';
}

#square1 .unit::after {
  content: '°C';
}

#square2 .unit::after {
  content: '中';
}

#square3 .unit::after {
  content: 's';
}

#square4 .unit::after {
  content: '℃';
}

#square5 .unit::after {
  content: 's';
}


#square1 .icon {
  background-image: url('/温度计.png');
}

#square2 .icon {
  background-image: url('/压缩机.png');
}

#square3 .icon {
  background-image: url('/间隔周期.png');
}

#square4 .icon {
  background-image: url('/温差.png');
}

#square5 .icon {
  background-image: url('/时间.png');
}

#square6 .icon {
  background-image: url('/地址.png');
}

.form-container {
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: auto;
  /* 居中 */
  height: 80%;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, rgba(41, 33, 119, 0.5), rgba(0, 255, 255, 0.1));
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.8), inset 0 0 10px rgba(0, 255, 255, 0.5);
  font-family: 'Orbitron', sans-serif;
}


.input-group {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.input-group label {
  margin-right: 10px;
  color: rgba(0, 255, 255, 0.8);
}

.input-group input {
  padding: 10px;
  border-radius: 5px;
  border: none;
  width: 150px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 0 5px rgba(0, 255, 255, 0.5);
  color: #00ffff;
}

.input-group input:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
}

.form-container button {
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background: rgba(0, 255, 255, 0.5);
  color: #000;
  font-weight: bold;
  cursor: pointer;
  width: 200px;
  transition: all 0.3s ease;
}

.form-container button:hover {
  background: rgba(0, 255, 255, 0.8);
  box-shadow: 0 0 10px rgba(0, 255, 255, 1), 0 0 20px rgba(0, 255, 255, 0.5);
  color: #fff;
}
</style>