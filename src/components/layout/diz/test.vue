<template>
  <div style="display: flex;">
    <div style="margin: 20px; height:350px;width: 300px;background-image: url('https://th.bing.com/th/id/R.9c01405dd55ba7c6184f148b0d6880a2?rik=Om%2bZ3KtAmeBi0Q&riu=http%3a%2f%2fwww.njupco.com%2fubook%2fbookimgs%2f200911132009%e5%9c%a8a.jpg&ehk=FUHo20KaInuY4tAYlUbYCYdZqKG42WMkmd9dURlRWYY%3d&risl=&pid=ImgRaw&r=0');background-size: 80%; background-repeat: no-repeat;">
    </div>
    <div style="margin-top: 20px;">
      <div style="color: blue;margin: 20px;">所在书柜位置:<span style="margin-left: 20px;">三山</span></div>
      <div style="color: blue;margin: 20px;">页面破损情况:<span style="margin-left: 20px;">八成新</span></div>
      <div style="color: blue;margin: 20px;">有无缺页:<span style="margin-left: 20px;">无</span></div>
      <div style="color: blue;margin: 20px;">版本信息:<span style="margin-left: 20px;">2017版</span></div>
      <div style="color: blue;margin: 20px;">售价:<span style="margin-left: 20px;">10元</span></div>
    </div>
    <div id="main" style="height: 400px;width: 500px;margin-left: 30px;"></div>
  </div>
  <div style="padding: 30px;">《大学物理实验》是由詹卫伸主编，科学出版社于2016年8月出版的科学出版社“十三五”普通高等教育本科规划教材、普通高等教育“十三五”规划教材。该书可作为理工类本科生大学物理实验教材，也可作为从事物理实验教学的教师和工程技术人员的教学参考书以及物理类本科生普通物理实验教材。 [1-2]
    该书包括：大学物理实验规范（有效数字及其运算规则、测量与误差、测量的不确定度、物理实验的数据处理方法、物理实验与物理实验报告）、大学物理实验（24个实验，分为基础性物理实验和综合设计性物理实验，上册有8个实验，下册有16个实验）、著名物理实验简介（20项）。 [3-4]
    中文名大学物理实验作 者詹卫伸、王硕出版时间2016年8月1日(上册)
    2016年8月26日(下册)出版社科学出版社ISBN9787030493699类 别上册：科学出版社“十三五”普通高等教育本科规划教材、下册：普通高等教育“十三五”规划教材开 本16 开装 帧平装全书页数上册：175页、下册：340页书 号上册：9787030493699、下册：9787030493682字 数上册：308千字、下册：350千字CIP核字号上册：2016160000、下册：2016159999</div>
  <el-button type="primary" round @click="dialogFormVisible = true" style="margin-left: 1100px;">购买</el-button>
  <el-dialog v-model="dialogFormVisible" title="用户信息">
    <el-form :model="form">
      <el-form-item label="电话号码" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="取书地点" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="山三楼" value="shanghai" />
          <el-option label="三江楼" value="beijing" />
          <el-option label="图书馆" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button :plain="true" @click="open2"> <el-button type="primary" @click="dialogFormVisible = false">
          确认购买
        </el-button></el-button>
       
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import * as echarts from 'echarts';
import {onMounted}from 'vue'
export default{
  name:'CeShi',
  setup(){
    onMounted(()=>{
      const myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({
  title: {
    text: '数目信息图',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '未写页数' },
        { value: 735, name: '缺页率' },
        { value: 580, name: '破损率' },
        { value: 484, name: '纸张清晰度' },
        { value: 300, name: '磨损度' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
);
    })
  
    
const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const open2 = () => {
  ElMessage({
    message: '购买成功！',
    type: 'success',
  })
}
    return {
      dialogTableVisible,
      dialogFormVisible,
      formLabelWidth,
      form ,
      open2
    }
  }
}
</script>
<style>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>