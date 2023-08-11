<script>
export default{
    name:'NavComp',
    
    setup(){



        return {

        }
    }
}

</script>
<template>
    <div class="container">
     <el-menu class="no-border-right" default-active="2">
      <el-menu-item index="1">迪拜购物中心</el-menu-item>
      <el-menu-item index="2">埃德蒙顿购物中心</el-menu-item>
      <el-menu-item index="3">大运河购物中心</el-menu-item>
      <el-menu-item index="4">Nickelodeon购物中心</el-menu-item>
      <el-menu-item index="5">成功时代广场</el-menu-item>
      <el-menu-item index="6">双威金字塔购物中心</el-menu-item>
    </el-menu>

    </div>
</template>
<style scoped>
.container{
    width: 15rem;
    height:100% ;

    overflow-y: auto;
}
.no-border-right{
    border-right: none;
}
</style>