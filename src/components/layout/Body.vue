<script>
export default{
    name:'BodyComp',

    setup(){



        return {

        }
    }
}

</script>
<template>
    <div class="container"> 
      <router-view></router-view>
    </div>
   
</template>
<style scoped>
.container{
    height: 100%;
    width: calc(100% - 15rem);
    /* background-color: blue; */
    overflow-y: auto;
    background-color: rgb(244, 243, 243);
}
</style>