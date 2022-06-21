<template>
  <div class='navcontent'>
    <div class="navitem">
      <el-input v-model="input" placeholder="搜索关键词" @keyup.enter="entersearch()"/>
    </div>
    <div class="navitem" v-for="(item, index) in categoryoptions" :key="item.value" @click="changepage(item.value)">
      <div >
          <span>{{item.value}}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted,reactive, ref, watch} from 'vue';
import { useRouter, useRoute } from 'vue-router'
import {categorylist} from '../api/index';// 导入我们的api接口
import xss from 'xss'
// const test=new Array(6).fill({name:'名字',path:'123'})
const router = useRouter()
const route = useRoute()
const input=ref('')
// watch(()=>input.value,()=>{
//   console.log(xss(input.value))
// })
function changepage(name){
  router.push('/category/'+name+'')
}
var categoryoptions=reactive([])
function getcategorylist(){
  categoryoptions.splice(0)
  categorylist().then((res)=>{
    let list=res
    for(let i=0;i<list.length;i++){
      categoryoptions.push({
        value:list[i].name
      })
    }
    categoryoptions.push({
      value:''
    })
  })
}
function entersearch(){
  router.push('/search/'+input.value)
  console.log(xss(input.value))
  input.value=''
}
onMounted(()=>{
    getcategorylist()
})
</script>
<style lang="scss" scoped>
.navcontent{
    // min-width: 250px;
    height: 300px;
    overflow-x: scroll;
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.navitem{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    height: 60px;
    padding: 14px 25px;
    cursor: pointer;
    span{
        font-weight: bolder;
    }
    &:hover{
        color: gray;
    }
}
</style>
