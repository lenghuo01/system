
<script>
import{ref}from'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
//import{gao2}from'@/http/axios.js'

export default{
    name:'LoginComp',
    
    setup(){
  const username ="张三"
  const password1='123456'
        const err = () => {
  ElMessage({
    showClose: true,
    message: '用户名或密码错误！！！',
    type: 'error',
  })
}
    const router= useRouter()
    //发起后端请求
       async function bu(name,password){
       // const result=await gao2.post(`/login`)
            //localStorage.setItem('token',result.data.token)
            if(name===username&&password==password1){
            //     router.push({
            //         path: '/home/upload',
            //         query:{
            //             name,
            //             password,
            //         }
            //     })
            // if(name===result.data.data.username&&password===result.data.data.password){
            //     router.push({
            //         path: '/home/upload',
            //         query:{
            //             name,
            //             password,
            //         }
            //     })
                router.push({
                    path: '/home/upload',
                    query:{
                        name,
                        password,
                    }
                })
            }else{
            err()
         
        }
        }

        const form=ref({
            name:'',
            password:''
        })

        

        return{
            form,
            bu
        }
    }
}


</script>
<template>
    <div  class="box1">
        <div class="First">
          
    </div>

    <div class="Second">
        <div style="background-color: rgb(247, 245, 243);height: 600px;width: 700px;position: relative;top: 50px;left: 23px;">
        <h1 >二手书交易中心</h1>
       
         <el-form  :model="form" label-width="120px" style="position: relative;top: 60px;left: 0px;">
    <el-form-item  label="用户名：">
      <el-input style="width: 400px;"  v-model="form.name" placeholder="请输入您的用户名"/>
    </el-form-item>

    <el-form-item label="密码：">
      <el-input style="width: 400px;" v-model="form.password"
    type="password"
    placeholder="请输入您的密码"
    show-password>
      </el-input>
    </el-form-item>
    <el-form-item>
      
        <el-button @click="bu(form.name,form.password)">登录</el-button>
           
      
        
    </el-form-item>
    </el-form> 
    <img style="width: 700px; height: 200px; position:relative;top: 130px;" src="http://picture.itchenliang.club/static/png/mountain-48ab7c52.png" alt="">
       
</div>


    </div>
   
    </div> 
   
 
</template>

<style>
.First{
   

   height: 100vh;
   width: 50%;

background: url('https://img.zcool.cn/community/0142dd5ac1b73ca801218207b41dbd.jpg@1280w_1l_2o_100sh.jpg')
}
.Second{
   text-align: center;
    height: 100vh;
    width: 50%;


}
.box1{
    display: flex;
    justify-content: space-between;
    

}
body{
    margin: 0;
}
.Second h1{
    position: relative;

 top: 20px;
height: 78px;
opacity: 1;
/** 文本1 */
font-size: 56px;
font-weight: 700;
letter-spacing: 0px;
line-height: 65.63px;
color: rgba(73, 102, 223, 1);
text-align: center;
vertical-align: middle;
}
.input1{
    text-align: center;
    width: 400px;
}

</style>