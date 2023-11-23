<template>
  <div class="contain">
    <el-row :gutter="20">
    <el-col :span="12"><div style="margin: 10px;font-size: 20px;">图库</div></el-col>
    <el-col :span="12"><div style="margin: 10px;"><el-input
      v-model="input1"
      class="w-50 m-2"
      size="large"
      placeholder="Please Input"
      :suffix-icon="Search"
      @change="dianji"
    /></div> </el-col>
  </el-row>
  <!-- <el-upload
    v-model:file-list="fileList"
  
    list-type="picture-card"
  >

  </el-upload> -->
  <div style="display: flex;width: 100%; justify-content: space-around; padding: 20px;">

  <div style="background-color: antiquewhite;height: 250px;width: 220px;">
    <img src="@/components/img/upload.png" alt="" height="200px" width="200px" style="margin: 10px;border-radius: 10%;">
    <div style="text-align: center;">测试文件</div>
  </div>

  <div style="background-color: antiquewhite;height: 250px;width: 220px;">
    <img src="@/components/img/computerOrg.jpg" alt="" height="200px" width="200px" style="margin: 10px;border-radius: 10%;">
    <div style="text-align: center;">计算机组成原理</div>
  </div>
  
  <div style="background-color: antiquewhite;height: 250px;width: 220px;">
    <img src="@/components/img/Java.jpg" alt="" height="200px" width="200px" style="margin: 10px;border-radius: 10%;">
    <div style="text-align: center;">计算机组成原理</div>
  </div>
 </div>
 <div style="display: flex;width: 100%; justify-content: space-around;">
  <div style="background-color: antiquewhite;height: 250px;width: 220px;">
    <img src="@/components/img/shiyan.jpg" alt="" height="200px" width="200px" style="margin: 10px;border-radius: 10%;">
    <div style="text-align: center;">计算机组成原理</div>
  </div>

  <div style="background-color: antiquewhite;height: 250px;width: 220px;">
    <img src="@/components/img/suiji.jpg" alt="" height="200px" width="200px" style="margin: 10px;border-radius: 10%;">
    <div style="text-align: center;">计算机组成原理</div>
  </div>

  <div style="background-color: antiquewhite;height: 250px;width: 220px;">
    <img src="@/components/img/wuli.jpg" alt="" height="200px" width="200px" style="margin: 10px;border-radius: 10%;">
    <div style="text-align: center;">计算机组成原理</div>
  </div>

  </div>
  
  <el-dialog
    v-model="dialogVisible"
    title="查找结果"
    width="50%"
    :before-close="handleClose"
  >
  <div style="display:flex;">
    <div style="height:350px;width: 300px;background-image: url('https://th.bing.com/th/id/R.9c01405dd55ba7c6184f148b0d6880a2?rik=Om%2bZ3KtAmeBi0Q&riu=http%3a%2f%2fwww.njupco.com%2fubook%2fbookimgs%2f200911132009%e5%9c%a8a.jpg&ehk=FUHo20KaInuY4tAYlUbYCYdZqKG42WMkmd9dURlRWYY%3d&risl=&pid=ImgRaw&r=0');background-size: 60%; background-repeat: no-repeat;">
  </div>
  <div>
  <div style="color: blue;margin: 10px;">所在书柜位置:<span style="margin-left: 20px;">三山</span></div>
  <div style="color: blue;margin: 10px;">页面破损情况:<span style="margin-left: 20px;">八成新</span></div>
  <div style="color: blue;margin: 10px;">有无缺页:<span style="margin-left: 20px;">无</span></div>
  <div style="color: blue;margin: 10px;">版本信息:<span style="margin-left: 20px;">2017版</span></div>
  <div style="color: blue;margin: 10px;">售价:<span style="margin-left: 20px;">10元</span></div>
</div>
  </div>
 

  <span>《大学物理实验》是由詹卫伸主编，科学出版社于2016年8月出版的科学出版社“十三五”普通高等教育本科规划教材、普通高等教育“十三五”规划教材。该书可作为理工类本科生大学物理实验教材，也可作为从事物理实验教学的教师和工程技术人员的教学参考书以及物理类本科生普通物理实验教材。 [1-2]
该书包括：大学物理实验规范（有效数字及其运算规则、测量与误差、测量的不确定度、物理实验的数据处理方法、物理实验与物理实验报告）、大学物理实验（24个实验，分为基础性物理实验和综合设计性物理实验，上册有8个实验，下册有16个实验）、著名物理实验简介（20项）。 [3-4]
中文名大学物理实验作    者詹卫伸、王硕出版时间2016年8月1日(上册)
2016年8月26日(下册)出版社科学出版社ISBN9787030493699类    别上册：科学出版社“十三五”普通高等教育本科规划教材、下册：普通高等教育“十三五”规划教材开    本16 开装    帧平装全书页数上册：175页、下册：340页书    号上册：9787030493699、下册：9787030493682字    数上册：308千字、下册：350千字CIP核字号上册：2016160000、下册：2016159999</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="tiaozhuan">
          详情信息
        </el-button>
      </span>
    </template>
  </el-dialog>
    
  </div>
</template>

<script>
  import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter ,useRoute} from 'vue-router';
export default {
  name: 'MyBooks',


setup(){
  const router = useRouter()
  const input1 = ref('')
  const file=[]
  const fileList = [
  {
    name: 'plant-1.png',
    src:"@/components/img/upload.png",
  },
 
  {
    name: 'plant-2.png',
    src: '@/components/img/computerOrg.jpg',
  },

  {
    name: 'figure-1.png',
    src: '@/components/img/Java.jpg',
  },
  
  {
    name: 'figure-2.png',
    src: '@/components/img/shiyan.jpg',
  },
  {
    name: 'figure-2.png',
    src: '@/components/img/suiji.jpg',
  },
  {
    name: 'figure-2.png',
    src: '@/components/img/wuli.jpg',
  },

]
// watch(input1,async ()=>{
//   if(input1 === '大物实验')console.log(da)
// })
const dialogVisible = ref(false)
const dianji=function(){
 if(input1.value === '大物实验')
 dialogVisible.value=true
}


const handleClose = () => {
  ElMessageBox.confirm('精准查书')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
function tiaozhuan(){
  router.push('/home/test')
}
  return{
    Search,
    input1,
    fileList,
    dianji,
    handleClose,
    tiaozhuan,
    dialogVisible 
  }
}
 
};
</script>

<style>
.contain{
  height: 100%;
  width: calc(100% - 20px);
  margin: 10px;
  background-color: #ffffff;

}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>