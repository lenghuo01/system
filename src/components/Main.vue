<script>
import { onMounted } from 'vue';
import { useRouter ,useRoute} from 'vue-router';
export default{
    name:'MainComp',
    setup(){
        //传输参数
        const router = useRouter()
        //接收参数
        const route=useRoute()
        onMounted(()=>{
            console.log(route.query)
        })
        function bu(){
            router.push('/login')
        }

        return {
            bu,
        }
    }
}
</script>
<template>
    <a @click="bu">点我</a>
 
</template>
<style scoped>
    * {
    margin:0;
    padding:0;
    }
     
    a {
 
    text-decoration: none;
    position: absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    font-size: 24px;
    background:linear-gradient(90deg,#009DF7,#FF58A5,#FFE431,#009EFC);
    width:400px;
    height:100px;
    color:white;
    text-align:center;
    line-height:100px;
    border-radius:50px;
    background-size: 400%;
    }
    
    a::before{
        content:"";
        background:linear-gradient(90deg,#009DF7,#FF58A5,#FFE431,#009EFC);
        position:absolute;
        left:-5px;
        right:-5px;
        top:-5px;
        bottom:-5px;
        border-radius:55px;
        filter:blur(20px);
        z-index:-1;
        background-size:400%;
    }
    a:hover{
        animation:sun 8s infinite;
    }
    a:hover::before{
        animation:sun 8s infinite;
    }
    @keyframes sun{
        100%{
            background-position:-400% 0;
        }
    }
</style>