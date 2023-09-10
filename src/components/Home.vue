<script>
import BodyComp from'@/components/layout/Body.vue'
import HederComp from'@/components/layout/Heder.vue'
import NavComp from'@/components/layout/Nav.vue'
import { useRouter ,useRoute} from 'vue-router'
import{ref}from'vue'
export default{
    name:'HomeComp',
    components:{
        BodyComp,
        NavComp,
        HederComp
    },
    
    setup(){
        const route=useRoute()
        const router=useRouter()
        //console.log(route.query.name)
        const name1=ref(route.query.name)
        function loginout(){
            router.push('/login')
            localStorage.removeItem('token')
        }

        return {
            loginout,
            name1,
        }
    }
}

</script>
<template>
    <heder-comp :username="name1" :loginout="loginout"></heder-comp>
    <div class="body1">
        <nav-comp></nav-comp>
    <body-comp></body-comp>


    </div>
    
</template>
<style scoped>
.body1{
    height:calc(100% - 5.5rem);
    width: 100%;
    display: flex;
    
}
</style>