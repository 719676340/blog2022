<template>
  <div class="appcontent">
    <div class="nav">
      <div class="logocontent" @click="gohome">
        <img class="logoimg" src="https://s1.ax1x.com/2022/04/15/LG6p7R.jpg" alt="" srcset="">
      </div>
      <CategoryNav class="category"></CategoryNav>
    </div>
    <div class="viewcontent">
      <router-view :key="route.fullPath"></router-view>
    </div>
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
  display: flex;
  height: 100vh;
  overflow-y: hidden;
}
.nav{
  z-index: 100;
  height: 100vh;
  box-shadow: 1px 0 5px rgb(205, 205, 205);
}
.viewcontent{
  flex: 1 1 750px;
  overflow-y: scroll;
}
.logocontent{
  cursor: pointer;
}
@media screen and (min-width: 750px){
.nav{
  width: 250px;
}
}
@media screen and (max-width: 750px){
.appcontent{
  // display: flex;
  height: 100%;
  flex-wrap: wrap;
  overflow:auto;
}
.nav{
  width: 100%;
  height: 400px;
  // aspect-ratio: auto 1 / 2;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.logocontent{
  flex: 1 1;
}
.category{
  flex: 1 1;
}
.logoimg{
  width: 75%;
  height: 75%;
  // aspect-ratio:1;
  
}
.viewcontent{
  // width: 100%;
  overflow-y: auto;
}
}
</style>
