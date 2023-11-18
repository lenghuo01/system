<script>
import {onMounted, onUnmounted, ref}from 'vue'
import{ myserver}from'@/http/axios.js'

export default{

    name:'UpLoad',
    setup(){
     
        const imgurl=ref('')
        const formData=new FormData()
        const file=ref(null)
        const filename=ref('')
     
        const base64read=new FileReader()
        function getReadResult(){
            imgurl.value=base64read.result
        }
        onMounted(()=>{
            base64read.addEventListener('load',getReadResult)
        })
        onUnmounted(()=>[
            base64read.removeEventListener('load',getReadResult)
        ])

        const tijiao=function(){
            file.value.click()
        }
        const handlefile=function(){
         filename.value=file.value.files[0].name
         formData.append('file',file.value.files[0])
         base64read.readAsDataURL(file.value.files[0])
        }
        //表单上传文件
        function testServer(){
            myserver.post('/myfiles',formData)
        }
        //转成base64上传
        function uploadBase64(){
            const base64=imgurl.value.split(',')[1]
            console.log(base64)
            myserver.post('/myfiles',{file:base64})
        }
        let id=ref("hh")
        function jisuanji(){
          id="计算机学院藏书柜"
          console.log(id)
        }
        function nengdong(){
          id="能动学院藏书柜"
          console.log(id)
        }
        function faxueyuan(){
          id="法学院藏书柜"
          console.log(id)
        }
        function yiyao(){
          id="医药学院藏书柜"
        }
        function cheliang(){
          id="车辆工程藏书柜"
        }
       function handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      }
      function beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    
        return {
            tijiao,file,filename,handlefile,testServer,
            uploadBase64,imgurl,jisuanji,nengdong,faxueyuan,yiyao,cheliang,id,handleAvatarSuccess, beforeAvatarUpload
        }
    }
}

</script>
<template>
    <div  style="overflow-y: auto;"> 
        <div style="color: rgba(73, 102, 223, 1);font-size: 28px;margin-left: 10px;">
            让买书变得简单有效 !
        </div>
        <div style="color: red;margin-left: 10px;padding-top: 10px; font-size: 15px;">严禁上传包含反动、暴力、色情、违法、及侵权内容的文件。</div>
        <div style="background-color:white;height: 10rem;width:calc(100%rem - 40px);padding: 20px;margin: 20px;">
        <div style="    font-size: 18px;margin-bottom: 15px;">选择所在学院</div>
        <el-row style="display: flex;justify-content: space-around;padding: 10px;margin: 20px 10px 10px 10px;">
        <el-button type="primary" size="large" @click="jisuanji">计算机学院</el-button>
        <el-button type="primary" size="large" @click="nengdong">能动学院</el-button>
        <el-button type="primary" size="large" @click="faxueyuan">法学院</el-button>
        <el-button type="primary" size="large" @click="yiyao">医药学院</el-button>
        <el-button type="primary" size="large" @click="cheliang">车辆工程学院</el-button>
        </el-row>
        </div>
        <div style="background-color:white;height: 25rem;width:calc(100%rem - 40px);padding: 20px;margin: 20px;">
          <div style="text-align: center;color: blue;font-size: 20px;">上传图书封面</div>
            <el-dropdown split-button >
      选择专业
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>物联网工程</el-dropdown-item>
          <el-dropdown-item>计算机科学与技术</el-dropdown-item>
          <el-dropdown-item>软件工程</el-dropdown-item>
          <el-dropdown-item>通信工程</el-dropdown-item>
          <el-dropdown-item>智能科技</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-upload
    class="upload-demo"
    drag
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    multiple
  >
    <img src="@/components/img/upload.png" alt="">
    
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
            <!-- <div>
                <el-button @click="tijiao">选择文件</el-button>
                <input @change="handlefile" type="file" ref="file" style="height: 0px;width: 0px;">
                <div v-show="filename" style="color:  #79bbff;">{{ filename }}</div>
             <div>
                <el-button @click="testServer">提交文件</el-button>
             </div>  
             <div>
                <el-button @click="uploadBase64">64上传</el-button>
             </div>
             <div>
                <img style="width: 30px;" v-show="filename" :src="imgurl" alt="">
             </div>
            </div>-->
        </div> 
        <div style="display: flex;">
        <div style="margin: 10px;width: calc(50% - 20px);height: 10rem;background-color: white;border-radius: 1rem;">
            <div style="margin-left: 10px;">版本介绍</div>
            <div style="margin: 10px;">数目名称：</div>
            <div style="margin-left: 10px;">版本信息：</div>
        </div>
        <div style="margin: 10px;width: calc(50% - 20px);height: 10rem;background-color: white;border-radius: 1rem;">
            
            <div style="margin-left: 10px;">破损程度描述</div>
          
        </div>
    </div>

    </div>
</template>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>