<template>
  <div class="appcontent">
    <div class="nav">
      <div class="logocontent" @click="gohome">
        <img class="logoimg" src="https://s1.ax1x.com/2022/04/15/LG6p7R.jpg" alt="" srcset="">
      </div>
      <CategoryNav style="width: 20px;height: 300px;"></CategoryNav>
    </div>
    <div class="viewcontent"><router-view :key="route.fullPath"></router-view></div>
  </div>
  <!-- <FigureTitle style="width: 100px;"></FigureTitle> -->
  <!-- <ArticlePage style="width: 600px;"></ArticlePage> -->
  <!-- <TypePage style="width: 600px;"></TypePage> -->
  <!-- <Home></Home> -->
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import CategoryNav from './components/CategoryNav.vue';
import FigureTitle from './components/FigureTitle.vue';
import ArticlePage from './views/ArticlePage.vue';
import TypePage from './views/TypePage.vue';
import Home from './views/Home.vue';
import { useRouter, useRoute } from 'vue-router'
import {nextTick, provide, ref} from 'vue'

const router = useRouter()
const route = useRoute()
// route.params.uid
function gohome(){
  router.push('/')
}

</script>
<style lang="scss" scoped>
.appcontent{
  // display: flex;
  min-width: 500px;
  position: relative;
  // overflow: hidden;
}
.nav{
  // width: 270px;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  box-shadow: 1px 0 5px rgb(205, 205, 205);
}
.navcontent{

}
// .logocontent{
//   width: 100%;
//   height: 0;
//   padding-bottom: 60%;
//   overflow: hidden;
//   position: relative;
//   margin: 0px 0 200px;
//   cursor: pointer;
// }
// .logoimg{
//   display: block;
//   width: 100%;
//   height: 100%;
//   position: absolute;
// }
.viewcontent{
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
}
@media screen and (min-width:1300px){
.nav{
  width: 270px;
}
.viewcontent{
  left: 270px;
  width: calc(100%  - 270px);
  // height: 100vh;
}
.logocontent{
  width: 100%;
  height: 0;
  padding-bottom: 60%;
  overflow: hidden;
  position: relative;
  margin: 0px 0 200px;
  cursor: pointer;
}
.logoimg{
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
}
}
@media screen and (min-width:1100px) and (max-width: 1300px){
.nav{
  width: 250px;
}
.viewcontent{
  left: 250px;
  width: calc(100%  - 250px);
}
.logocontent{
  width: 100%;
  height: 0;
  padding-bottom: 60%;
  overflow: hidden;
  position: relative;
  margin: 0px 0 200px;
  cursor: pointer;
}
.logoimg{
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
}
}
@media screen and (max-width: 1100px){
.nav{
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position:relative;
  height: 400px;
}
.logocontent{
  // overflow: hidden;
  width: 250px;
  height: 250px;
}
.logoimg{
  width: 100%;
  height: 100%;
}
.viewcontent{
  position: relative;
}
}
</style>
