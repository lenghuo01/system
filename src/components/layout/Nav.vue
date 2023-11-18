<script>
import{watch,ref}from'vue'
import { useRoute } from 'vue-router';
export default{
    
    name:'NavComp',
    
    setup(){
         const route=useRoute()
         
        const menuItemPath=[
            {path:'/home/upload',text:'上传图书'},
            {path:'/home/mybooks',text:'查询图书'},
            {path:'/home/myfiles',text:'我的文件'},
            {path:'/home/kefu',text:'在线客服'},
        ]
        const defaultMenu=ref(menuItemPath[0].path)
        const menuItemPathRef=ref(menuItemPath)
     
        watch(
            ()=>route.path,
            ()=>{
                
                // if(){
                //     defaultMenu.value=route.path
                  
                // }
                watch(
      () => route.path,
      () => {
        if (menuItemPath.find(() => route.path !== menuItemPath.path)) {
          defaultMenu.value = route.path
        }
      },
      { immediate: true }
    )

            },{immediate:true}
        )
        return {
         
            defaultMenu,
            menuItemPathRef

        }
    }
}

</script>
<template>
    <div class="container">
     <el-menu class="no-border-right" :default-active="defaultMenu" router>
        <el-menu-item v-for="hh in menuItemPathRef" :key="hh.path" :index="hh.path">
            {{hh.text  }}
        </el-menu-item>

    </el-menu>

    </div>
</template>
<style scoped>
.container{
    width: 18rem;
    height:100% ;

    overflow-y: auto;
    border-right: 1px solid #dcdee2;
    background: #fff;
}
.no-border-right{
    border-right: none;
}
</style>