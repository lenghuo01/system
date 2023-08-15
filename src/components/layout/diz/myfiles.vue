<script>
import {  ref} from 'vue'
import{requestQuery, becomePromise}from'@/http/xhr.js'
import{gao1}from'@/http/axios.js'
export default{

    name:'MyFiles',
    setup(){
        const cityCode=ref()
        const w=ref()
      async  function weather(){
            // requestQuery('GET', {
            //     key:'4f7780acd0a427a25259799e05ed68b1',
            //     city:cityCode.value,
            //     extensions:'all'
            // },
            // console,log
            // )


        //    const result= await becomePromise('GET', {
        //         key:'4f7780acd0a427a25259799e05ed68b1',
        //         city:cityCode.value,
        //         extensions:'all'
        //     })
        //     console.log(result) 
        //     w.value=result.forecasts 


        // const result=await fetch(`https://restapi.amap.com/v3/weather/weatherInfo?key=4f7780acd0a427a25259799e05ed68b1&city=${cityCode.value}&extensions=all`)
        // const data=await result.json()
        // console.log(data)

            const result=await gao1.get(`/weather/weatherInfo`,{
                params:{
                    key:'4f7780acd0a427a25259799e05ed68b1',
                    city:cityCode.value,
                    extensions:'all'
                }
            })

            console.log(result.data )
        }


        return {
            weather,
            cityCode,
        w
        }
    }
}

</script>
<template>
    <div> 我的文件</div>
    <el-input v-model="cityCode" placeholder="请输入城市编码" />
    <el-button @click="weather">点击查询天气</el-button>
    <div>{{ w }}</div>
</template>