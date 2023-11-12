<script>

export default{
    name:'HederComp',
    props:['username','loginout'],
    
    setup(){
     


        return {

        }
    }
}

</script>
<template>
    <div class="container">
        <div style="font-size: 30px;font-family: Arial, Helvetica, sans-serif;margin-left: 10px;">二手书交易</div>
        
        <div style="margin-left: 60px;display: flex;">
        <el-dropdown>
    <span class="el-dropdown-link" style="height:100%px;width: 160px;display: flex;">
        
       <div style="width: 60px;height: 100%;"><img src="https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/a2cc7cd98d1001e900e51e21bb0e7bec55e797c6.jpg" 
        style="height: 95%;"
        ></div>
       <div style="margin-left: 10px;">
       <div style="font-size: 13px;height: 20px;width: 100px;margin-top: 10px;">用户：{{ username }}</div>
        <div style="height: 20px;font-size: 13px;margin-top: 10px;">关注 : 0</div>
    </div>
      <el-icon class="el-icon--right">
    
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>账号信息</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</div >

        <el-button round style="width: 100px;height: 40px;margin-top: 14px;margin-left: auto;
        " @click="loginout">返回</el-button>
       
    </div>
</template>
<style scoped>
.container{
    height: calc(5.5rem - 1px);
    display: flex;
    line-height: 2;
    border-bottom: 1px solid #dcdee2;
}
.items-center{
    text-align: center;
   
}
.el-dropdown-link:hover{
  cursor: pointer;
}

</style>