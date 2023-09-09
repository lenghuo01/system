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
            myserver.post('/upload',formData)
        }
        //转成base64上传
        function uploadBase64(){
            const base64=imgurl.value.split(',')[1]
            console.log(base64)
            myserver.post('/upload',{file:base64})
        }

        return {
            tijiao,file,filename,handlefile,testServer,
            uploadBase64,imgurl
        }
    }
}

</script>
<template>
    <div  style="overflow-y: auto;"> 
        <div style="color: rgba(73, 102, 223, 1);font-size: 28px;margin-left: 10px;">
            让存储变得简单有效 !
        </div>
        <div style="color: red;margin-left: 10px;padding-top: 10px; font-size: 15px;">严禁上传包含反动、暴力、色情、违法、及侵权内容的文件。</div>
        <div style="background-color:white;height: 10rem;width:calc(100%rem - 40px);padding: 20px;margin: 20px;">
        <div style="    font-size: 18px;margin-bottom: 15px;">选择储存仓库</div>
        <el-row style="display: flex;justify-content: space-around;padding: 10px;margin: 20px 10px 10px 10px;">
        <el-button type="primary" size="large">Storage01</el-button>
        <el-button type="primary" size="large">Storage02</el-button>
        <el-button type="primary" size="large">Storage03</el-button>
        <el-button type="primary" size="large">Storage04</el-button>
        <el-button type="primary" size="large">Storage05</el-button>
        </el-row>
        </div>
        <div style="background-color:white;height: 25rem;width:calc(100%rem - 40px);padding: 20px;margin: 20px;">
            <el-dropdown split-button >
      Dropdown List
      
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item>Action 4</el-dropdown-item>
          <el-dropdown-item>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
            <div>
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
            </div>
        </div>
        <div style="display: flex;">
        <div style="margin: 10px;width: calc(50% - 20px);height: 10rem;background-color: white;">
            hh
        </div>
        <div style="margin: 10px;width: calc(50% - 20px);height: 10rem;background-color: white;">
            hh
        </div>
    </div>

    </div>
</template>