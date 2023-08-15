import axios from'axios'
const gao1=axios.create({
    baseURL:'https://restapi.amap.com/v3',
    timeout:1000,
})

const gao2=axios.create({
    baseURL:'http://127.0.0.1:4523/m1/3150959-0-default',
    timeout:1000,
})
export{
    gao1,
    gao2
}