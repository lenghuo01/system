<script>
import { onMounted } from 'vue';
import { useRouter ,useRoute} from 'vue-router';
export default{
    name:'MainComp',
    setup(){
        // //传输参数
         const router = useRouter()
        // //接收参数
        // const route=useRoute()
        // onMounted(()=>{
        //     console.log(route.query)
        // })
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
 
    <!-- <div class="video-background">
    <video autoplay muted loop id="bgVideo" >
      <source src="./img/beijing.mp4" type="video/mp4">
    </video>
 
 
     <a @click="bu">点击登录</a>
  </div> -->
  <div class="container">
    <video
      class="video-bg"
      loop
      autoplay
      muted
      preload="auto"
      src="./img/beijing.mp4"
    ></video>
    <div class="main-body">
      <div class="title">激发创造，丰富生活</div>
      <div ><a @click="bu">点击登录</a></div>
    </div>
  </div>
 
</template>
<style scoped>

    * {
    margin:0;
    padding:0;
    }
     
    a {
      align-items: center;
    text-decoration: none;
    position: absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    font-size: 18px;
    background:linear-gradient(90deg,#009DF7,#FF58A5,#FFE431,#009EFC);
    width:156px;
    height:54px;
    color:white;
    text-align:center;
    line-height:50px;
    border-radius:50px;
    background-size: 400%;
    animation:sun 8s infinite;
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
        animation:sun 8s infinite;
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
    .container {
  height: 100%;
  overflow: hidden;
}

.video-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  object-fit: cover;
  z-index: -1;
}

.main-body {
  margin-top: 250px;
  width: 100%;
  display: flex;

  flex-wrap: wrap;
  justify-content: center;

  .title {
    text-align: center;
    width: 100%;
    font-size: 56px;
    color: white;
    margin-bottom: 40px;
    font-weight: 600;
  }
}

.login-btn {
  width: 156px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 27px;
  background-color: white;
  color: #00b86b;
  font-size: 14px;

  &:hover {
    cursor: pointer;

    color: #11975f;
  }
}
</style>