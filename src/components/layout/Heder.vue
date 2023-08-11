<script>
export default{
    name:'HederComp',
    props:['username','bu'],

    setup(){



        return {

        }
    }
}

</script>
<template>
    <div class="container">
        <span style="font-size: 30px;font-family: Arial, Helvetica, sans-serif;position: relative;left:10px;">世界商店</span>
        <img src="https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/a2cc7cd98d1001e900e51e21bb0e7bec55e797c6.jpg" 
        style="border-radius: 50%,50%;position: relative;left: 50px;height: 80%;"
        >
        <div style="position: relative;font-size: 13px; left: 60px;">用户：{{ username }}</div>
        <div style="position: relative;top: 30px;left: -4px;">关注 : 0</div>
        <!-- <button style="position: relative;left: 400px;">关注的商店</button> -->
        
        <el-button round style="position: relative;left:calc(100% - 400px);top:16px;width: 100px;height: 40px;" @click="bu">返回</el-button>

    </div>
</template>
<style scoped>
.container{
    height: 5.5rem;
    display: flex;
    line-height: 2;
}
.items-center{
    text-align: center;
   
}

</style>