<script>
import { watch } from 'vue';
import { onMounted } from 'vue';
export default {
  name: "Box",
  props: ['boxStatus1'],
  setup(props) {
    document.addEventListener('DOMContentLoaded', () => {
      watch(()=>props.boxStatus1, (newValue, oldValue) => {
        console.log(newValue)
        const drawers = document.querySelectorAll('.drawer');
        drawers.forEach((val, index) => {
          if (props.boxStatus1[index] === 1 && val.classList.contains('closed')) {
            val.classList.remove('closed');
            val.classList.add('open');
          }
          if (props.boxStatus1[index] === 0 && val.classList.contains('open')) {
            val.classList.remove('open');
            val.classList.add('closed');
          }
        })
      }, {
        immediate: true,
        deep: true
      });

    });



    return {

    }
  }
}
</script>
<template>
  <div class="cabinet">
    <!-- 生成10个抽屉 -->
    <div class="drawer open close" id="drawer1">1</div>
    <div class="drawer open close" id="drawer2">2</div>
    <div class="drawer open close" id="drawer3">3</div>
    <div class="drawer open close" id="drawer4">4</div>
    <div class="drawer open close" id="drawer5">5</div>
    <div class="drawer open close" id="drawer6">6</div>
    <div class="drawer open close" id="drawer7">7</div>
    <div class="drawer open close" id="drawer8">8</div>
    <div class="drawer open close" id="drawer9">9</div>
    <div class="drawer open close" id="drawer10">10</div>
  </div>
</template>
<style>


/* .cabinet {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 40%;
  height: 80%;
  bottom: 20%;
  background: linear-gradient(145deg, #1e1e1e, #3a3a3a);
  
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
  
} */
.cabinet {
    display: flex;
    flex-wrap: wrap;
    height:80%;
    width: 40%;
    /* bottom: 40%; */
    background: linear-gradient(145deg, #1e1e1e, #3a3a3a);
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
   
    transform-style: preserve-3d;
    transition: transform 0.5s ease;
    justify-content: space-between;
}


.cabinet::before {
  content: '快递柜';
  display: block;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 15px;
  width: 100%;
  /* 让标题居中 */
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
  /* 添加文字阴影 */
}

.drawer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 13%;
    width: 43% ;
    margin: 5px;
    background: linear-gradient(145deg, #4b4b4b, #2b2b2b);
    border: 2px solid #888;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.5s ease, background 0.5s ease;
    transform-origin: left;
    
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}
.drawer::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 5px;
    right: -5px;
    background: linear-gradient(145deg, #2b2b2b, #4b4b4b,);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.drawer.open {
    transform: perspective(1000px) rotateY(-100deg);
    background: linear-gradient(145deg, #6a6a6a, #3a3a3a);
}

.drawer.closed {
    transform: perspective(1000px) rotateY(0);
}

.drawer::before {
  content: attr(data-label);
  /* 使用 data-label 属性添加内容 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  /* 添加文字阴影 */
}
</style>