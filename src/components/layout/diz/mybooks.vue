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
    /></div> </el-col>
  </el-row>
  <!-- <el-upload
    v-model:file-list="fileList"
  
    list-type="picture-card"
  >

  </el-upload> -->
  <div style="display: flex;width: 100%; justify-content: space-around; padding: 20px;">
  
  <img src="@/components/img/upload.png" alt="" height="200px" width="200px">
  <img src="@/components/img/computerOrg.jpg" alt="" height="200px" width="200px">
  <img src="@/components/img/Java.jpg" alt="" height="200px" width="200px">
 </div>
 <div style="display: flex;width: 100%; justify-content: space-around;">
  <img src="@/components/img/shiyan.jpg" alt="" height="200px" width="200px">
  <img src="@/components/img/suiji.jpg" alt="" height="200px" width="200px">
  <img src="@/components/img/wuli.jpg" alt="" height="200px" width="200px">

  </div>
    
  </div>
</template>

<script>
  import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
export default {
  name: 'MyBooks',


setup(){

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


  return{
    Search,
    input1,
    fileList
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