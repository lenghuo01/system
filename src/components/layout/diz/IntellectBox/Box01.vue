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
body {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  background-color: #f0f0f0;
  perspective: 1000px;
}

.cabinet {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  /* 增加宽度以适应门的厚度 */
  background-color: #333;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  transform-style: preserve-3d;
}

.cabinet::before {
  content: '快递柜';
  display: block;
  text-align: center;
  font-size: 20px;
  color: #fff;
}


.drawer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8%;
  margin: 5px 0;
  background-color: #ccc;
  border: 2px solid #888;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.5s ease;
  transform-origin: left;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.drawer::after {
  content: '';
  position: absolute;
  top: 0;
  right: -10px;
  /* 门厚度 */
  bottom: 0;
  /* 门厚度 */
  background-color: #ccc;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.drawer.open {
  transform: perspective(1000px) rotateY(-100deg);
}

.drawer.closed {
  transform: perspective(1000px) rotateY(0);
}

.drawer::before {

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  color: #333;
}
</style>