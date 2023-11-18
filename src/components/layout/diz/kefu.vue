<script>
import { ref, watch } from 'vue'

export default {
  name: 'KeFu',

  setup() {
    const isshow = ref(0)
    const data = ref([
      {
        weti: '',
        answ: ''
      }
    ])
    let count = ref(0)
    const wenti = ref('')
    const ques = ref('')
    const answer = ref('')
    const gif = ref()
    const form = ref({
      name: '',
      password: ''
    })

    async function getanswer() {
      answer.value = 'Thinking...'
      isshow.value=1
      //获取数据
      const qingyunkeRes = await fetch(
        `https://124.223.90.239:8000/api/qingyunke?msg=${ques.value}`
      )
      //将数据转为JavaScript对象
      const qingyunkAns = await qingyunkeRes.json()
      return qingyunkAns.data.msg
    }
    async function getGif() {
      const res = await fetch('https://yesno.wtf/api')
      const data = await res.json()
      return data.image
    }
    watch(ques, async () => {
      if (ques.value.indexOf('？') > -1) {
        Promise.all([getanswer(), getGif()]).then(([resAnswer, resGif]) => {
          answer.value = resAnswer
          // gif.value=resGif
          // count.value++
        })
      }
    })
    async function hh() {
      Promise.all([getanswer()]).then(([resAnswer]) => {
        answer.value = resAnswer
        // gif.value=resGif
        //count.value++
        let obj = {}
        obj.weti = ques.value
        obj.answ = answer.value
        isshow.value=0
        data.value.push(obj)
      })
    }
    function fasong() {
      hh()

      console.log(this.data)
      /*  wenti.value = ques.value*/
      // this.count++
    }

    // console.log(form)
    return {
      ques,
      answer,
      gif,
      form,
      count,
      fasong,
      wenti,
      data,
      isshow
    }
  }
}
</script>
<template>
  <!-- <div>
    <div>请输入问题<input type="text" v-model="ques"></div>

    <div>机械人：{{ answer }}</div>
    <img :src="gif" />
  </div> -->
  <div class="chatAppBody">
    <div class="chatTitle">客服系统<span v-show="isshow" style="font-size: 15px;">(思考中...)</span></div>
    <div class="chatBox">
      <div class="chatBottom"><input v-model="ques" class="inp">
        <div><img src="@/components/img/fasong.png" alt="" @click="fasong"></div>
      </div>
      <div class="chatRow">
        <el-avatar class="chatAvatar" :size="30" src="https://goflychat.oss-cn-hangzhou.aliyuncs.com/static/upload/avator/2022June/32a988a3c2f8700119fa1f5da1b6a4bd.png"></el-avatar>
        <div class="chatMsgContent">
          <div class="chatUsername">唯一客服系统</div>
          <div class="chatContent">有什么可以帮您?</div>
        </div>
      </div>

      <div v-for="index in data">
        <div class="chatRow chatRowMe">
          <div class="chatContent">{{ index.weti  }}</div>
        </div>
        <div class="chatRow">
          <el-avatar class="chatAvatar" :size="30" src="https://goflychat.oss-cn-hangzhou.aliyuncs.com/static/upload/avator/2022June/32a988a3c2f8700119fa1f5da1b6a4bd.png"></el-avatar>
          <div class="chatMsgContent">
            <div class="chatUsername">唯一客服系统</div>
            <div class="chatContent">{{ index.answ }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.chatAppBody {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f1f5f8;
}
.chatTitle {
  background: #fff;
  text-align: center;
  color: red;
  font-size: 20px;
}
.chatBox {
  flex: 1;
  padding: 0 5px;
}
.chatBottom {
  position: absolute;
  bottom: 4px;
  border-radius: 4rem;
  display: flex;
  width: 100%;
}
.inp {
  border: 2px solid black;
  border-radius: 4rem;
  width: 50%;
  height: 30px;
}
.chatRow {
  display: flex;
  align-items: flex-end;
  margin: 5px 0px;
}
.chatAvatar {
  margin-right: 5px;
  flex-shrink: 0;
}
.chatUsername {
  font-size: 12px;
  white-space: nowrap;
  color: #999;
  margin-bottom: 2px;
}
.chatContent {
  border-radius: 10px 10px 10px 0px;
  padding: 10px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 5px 30px rgb(50 50 93 / 8%), 0 1px 3px rgb(0 0 0 / 5%);
  font-size: 14px;
  word-break: break-all;
  line-height: 21px;
}
.chatRowMe {
  justify-content: flex-end;
}
.chatRowMe .chatContent {
  border-radius: 10px 10px 0px 10px;
}
</style>