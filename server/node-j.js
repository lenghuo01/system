import http from 'node:http'
const server=http.createServer((req,res)=>{
    let fileBase64=''
    req.on('data',(chunk)=>{
        fileBase64=chunk.toString
    })
    req.on('end',()=>{

    })
    res.writeHead(200,{
        token:'123',
         'Access-Control-Allow-Origin':'*',
         'Access-Control-Allow-Headers':'content-type',
    })
    const obj={
      username:"张三",
      password:"123456"
    }
    const jsonObj=JSON.stringify(obj)
    res.end(jsonObj)
})
server.listen(8080,()=>{
    console.log('启动了')
})
