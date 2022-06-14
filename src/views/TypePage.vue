<template>
    <div class='typepagecontent'>
        <!-- <div class="backtoTop" @click="scroll(0,0)">
            <a href="javascript:scroll(0,0)">返回顶部</a>
        </div> -->
        <!-- https://blog.csdn.net/qq_41176306/article/details/111831195   自适应字符大小 -->
        <div class="head">
            <span>{{type}}:{{name}}</span>
        </div>
        <div class="articleitem" v-for="(item, index) in list" :key="index">
            <FigureTitle :article="item.content" :title="item.title" :time="item.date" :uid="item.uid"></FigureTitle>
        </div>
        <div ref="listend" class="listend"></div>
    </div>
            <!-- https://cloud.tencent.com/developer/article/1022385?from=15425 分页无线加载 -->
</template>

<script setup>
import { onMounted, reactive, ref,onBeforeUnmount} from 'vue';
import { useRouter, useRoute } from 'vue-router'
import {categorylist,getarticlebytaglimit,getarticlebycategorylimit,getarticlebycategory,getarticlebytag} from '../api/index';// 导入我们的api接口
import FigureTitle from '../components/FigureTitle.vue';
const router = useRouter()
const route = useRoute()
const listend=ref(null)
const type=ref('')
const name=ref('')
const articlelist=reactive([])

const issuelist=reactive([])

function getinfo(route){
    return new Promise((resolve, reject)=>{
        type.value=route.params.type
        name.value=route.params.name
        resolve()
    })

}
var list=reactive([])

// function getarticlelist(){
//     if(type.value=='category'){
//         getarticlebycategorylimit(name.value,list.length,5).then((res)=>{
//             if(res.length==0){
//                 finend()
//             }
//             list.push(...res.filter((item)=>{
//               return item.showsign==0
//             }))
//             console.log(res)
//         }).catch((err)=>{
//             console.log(err)
//         })
//     }else{
//         getarticlebytaglimit(name.value,list.length,5).then((res)=>{
//             if(res.length==0){
//                 finend()
//             }
//             list.push(...res.filter((item)=>{
//               return item.showsign==0
//             }))
//             console.log(res)
//         }).catch((err)=>{
//             console.log(err)
//         })        
//     }
// }
function getarticle(){
  if(list.length<issuelist.length){
    list.push(...issuelist.slice(list.length,list.length+5))
  }else{
    finend()
  }
}
function getallissue(){
    if(type.value=='category'){
        getarticlebycategory(name.value).then((res)=>{
          issuelist.push(...res.filter((item)=>{
            return item.showsign==0
          }))
          console.log(res)
          list.push(...issuelist.slice(list.length,5))
        }).catch((err)=>{
          console.log(err)
        })
    }else{
        getarticlebytag(name.value).then((res)=>{
          issuelist.push(...res.filter((item)=>{
            return item.showsign==0
          }))
          console.log(res)
          list.push(...issuelist.slice(list.length,5))
        }).catch((err)=>{
          console.log(err)
        })        
    }
}


function inittype(route){
    getinfo(route).then(()=>{
        // getarticlelist()
        getallissue()
    })
}

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
  // console.log(checkIsPartialVisible (element))
  if(checkIsPartialVisible (element)){
    // getarticlelist()
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


onMounted(()=>{
    inittype(route)
    checkend(listend.value)
    // console.log(route.params.type,route.params.name)
})
onBeforeUnmount(() => {
  finend()
})
</script>
<style lang="scss" scoped>
.typepagecontent{
    min-width: 600px;
    padding: 120px 0 0;
}
.head{
    display: flex;
    height: 70px;
    justify-content: center;
    align-items: center;
    padding-bottom: 40px;
    font-size: 32px;
    span{
        font-weight: bold;
    }
}
.figuretitlelist{
    overflow-x: scroll;
}
.articleitem{
    max-width: 820px;
}
.backtoTop{
    position: sticky;
    top: 30px;
    right: 50px;
}
.listend{
  width: 100%;
  height: 20px;
//   background-color: rgb(176, 176, 176);
}
</style>