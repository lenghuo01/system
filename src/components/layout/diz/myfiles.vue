<script>
import {  onMounted, ref} from 'vue'
import{requestQuery, becomePromise}from'@/http/xhr.js'
import{gao1}from'@/http/axios.js'
import { HttpStatusCode } from 'axios'
import { gao2 } from '../../../http/axios'
import { ElMessage } from 'element-plus'
export default{

    name:'MyFiles',
    setup(){
        const tableData=ref([])
        const currentPage=ref(1)
        const total=ref(0)
        const SIZE=20
        async function getTableData(size,curPage){
            const {data:res}=await gao2.get('/img/list',{
                params:{
                    pageSize:size,
                    pageNum:curPage
                }
            })
            console.log(res)
            //console.log(res.data)
            tableData.value=res.data.items
            total.value=res.data.totalSize
        }
        onMounted(()=>{
            getTableData(SIZE,currentPage.value)
        })
        function pageChange(curPage){
            getTableData(SIZE,curPage)
        }

        function copyLink(lineinfo){
            navigator.clipboard.writeText(lineinfo.row.fileUrl)
            ElMessage({
                message:'复制成功',
                type:'sucess'
            })
        }
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

            //console.log(result.data )
        }
        const handleClick=function(scope){
            window.open(scope.row.fileUrl)
        }


        return {
            weather,
            cityCode,
        w,
        tableData,
        handleClick,
        copyLink,
        pageChange,
        currentPage,
        total
        }
    }
}

</script>
<template>
    <div>
        <div> 天气查询</div>
        <el-input v-model="cityCode" placeholder="请输入城市编码" />
        <el-button @click="weather">点击查询天气</el-button>
        <div>{{ w }}</div>
    </div>
    <div style="width: 1275.6px;">
        <div>文件列表</div>
                      
        <!-- 
            1.文件名
            2.id
            3.文件大小
            4.文件url
            5.文件最近更新时间
            6.操作（下载）（复制分享连接）
         -->
        <el-table :data="tableData" :empty-text="暂无数据" style="width: 100%;">
            <el-table-column  prop="fileName" label="文件名" width="150" />
         <el-table-column  prop="fileSize" label="文件大小" width="150" />
         <el-table-column  label="文件URL" width="150" >
            <template v-slot:default="scope">
                <div>
                    <el-tooltip
                    effect="dark"
                    :content="scope.row.fileUrl"
                    placement="top"
                >
                        <el-button >文件连接</el-button>
                    </el-tooltip>
                </div>
      
            </template>
         </el-table-column>
         <el-table-column  prop="fileUpdateTime" label="文件更新时间" width="150" />
         <el-table-column  label="操作" width="200">
            <template #default="scope">
                <el-button  type="primary" size="small" @click="handleClick(scope)">下载</el-button>
                <el-button  type="primary" size="small" @click="copyLink(scope)">复制</el-button>
            </template>
    </el-table-column>
        </el-table>

        <el-pagination
      v-model:current-page="currentPage"
      small
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="pageChange"
    />

       
    </div>

</template>