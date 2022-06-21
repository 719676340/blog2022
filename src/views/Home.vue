<template>
  <div class='homecontent'>
    <div class="homepictrue">
      <img class="pictruecontent" :src="testimgurl" alt="">
      <div class="dowmsign">
          <i class="iconfont icon-xiangxiajiantou"></i>
      </div>
    </div>
    <div class="slogan"><span>小何的工作和生活</span></div> 
      <div class="articlelist">
        <div class="articleitem" v-for="(item, index) in items" :key="index">
            <FigureTitle :article="item.content" :title="item.title" :time="item.date" :uid="item.uid"></FigureTitle>
        </div>
        <div ref="listend" class="listend"></div>
      </div>
  </div>
</template>

<script setup>
import { onMounted, reactive,ref,onBeforeUnmount} from 'vue';
import FigureTitle from '../components/FigureTitle.vue';
import {getarticlelimit,getallarticle} from '../api/index';// 导入我们的api接口
const testimgurl='https://s1.ax1x.com/2022/04/22/LggL11.jpg'

const items=reactive([])
const listend=ref(null)
const issuelist=reactive([])
// 下面这个是无限加载的内容的
// https://www.ucloud.cn/yun/50815.html 无限加载的内容
// 用scroll检测是否触发
var time
function checkend(element){
  time=setInterval(() => {
    addarticle(element)
  }, 1000);
}
function finend(){
  clearInterval(time)
}
function addarticle(element){
  console.log(checkIsPartialVisible (element))
  if(checkIsPartialVisible (element)){
    getarticle()
  }
}
function checkIsPartialVisible (element) {
  const rect = element.getBoundingClientRect()
  const {
    top,
    left,
    bottom,
    right
  } = rect
  const isPartialVisible = top <= document.documentElement.clientHeight 
  return isPartialVisible
}
function getallissue(){
  getallarticle().then((res)=>{
    issuelist.push(...res.filter((item)=>{
      return item.showsign==0
    }))
    issuelist.reverse()
    // console.log(res)
    items.push(...issuelist.slice(items.length,5))
  }).catch((err)=>{
    console.log(err)
  })
}

function getarticle(){
  // getarticlelimit(items.length,5).then((res)=>{
  //   console.log(res)
  //   if(res.length==0){
  //     finend()
  //   }
  //   items.push(...res.filter((item)=>{
  //     return item.showsign==0
  //   }))
  //   // console.log(res)
  // }).catch((err)=>{
  //   console.log(err)
  // })
  if(items.length<issuelist.length){
    items.push(...issuelist.slice(items.length,items.length+5))
  }else{
    finend()
  }
}


onMounted(()=>{
  getallissue()
  // getarticle()
  checkend(listend.value)
})
onBeforeUnmount(() => {
  finend()
})
</script>
<style lang="scss" scoped>
.homecontent{
  width: 100%;
  overflow: auto;
}
.homepictrue{
  width: 100%;
  height: 100vh;
//   padding-bottom: 60%;
  overflow: hidden;
  position: relative; 
}
.pictruecontent{
    // position: absolute;
    width: 100%; 
    object-fit:cover; 
    // width: auto;
    height: 100%;
}
.dowmsign{
    position: absolute;
    color: white;
    bottom: 5px;
    left: 50%;
    animation: dong 1s infinite;
}
.articlelist{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    // max-width: 80%;
}
.slogan{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    // height: 60/3.75vw;
    padding-bottom: 50px;
    font-size: 40px;
    span{
        font-weight: bold;
    }
}
.articleitem{
   max-width: 80%;
    flex: 1 0 100%;
    // width: 100%;
}
.listend{
  width: 100%;
  height: 20px;
  // background-color: rgb(176, 176, 176);
}
@keyframes dong{
    0%{
        transform: translate(0,0);
    }
    50%{
        transform: translate(0,5px);
    }
    100%{
        transform: translate(0,0);
    }
}
</style>
