<template>
  <div class='figuretitlecontent'>
    <div v-show="showimg" class="firstimg" @click="changepage()">
        <img  class="imgcontent" :src="imgpath" alt="" srcset="">
    </div>
    <div class="titleword" >
        <div class="articletitle" @click="changepage()">
            <span class="titlestyle">{{title}}</span>
        </div>
        <div class="articletime" @click="changepage()">
            <span>{{showtime}}</span>
        </div>
        <div class="articleintroduction">
            <span v-html="firstpag"></span>
        </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted,ref} from 'vue';
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const props=defineProps(['article','title','time','uid'])
// 下面这个是测试用的
// const html='<p><img src="https://s1.ax1x.com/2022/04/13/LMOUgI.png" style="max-width:100%;" contenteditable="false" width="517.12" height="264.27"/><br/></p><p>&nbsp; &nbsp; 时间是这样过的比较快的<br/></p>'
const matchimg='img src=".*?" style'
const matchfirstpag='<p>.[^img]*?</p>'

const html=props.article
// v-if="imgpath==''"
const imgpath=ref('')
function getimgpath(){
    let imgword=html.match(matchimg)
    if(imgword!=null){
        // imgword=imgword[0].split('')
        imgword=imgword[0]
        // console.log(imgword.slice(imgword.indexOf('\"')+1),imgword.lastIndexOf('\" a'))
        imgpath.value=imgword.slice(imgword.indexOf('\"')+1,imgword.lastIndexOf('\" alt'))
        console.log(imgpath.value)
    }   
}
var showimg=computed(()=>{
    return imgpath.value!=''
})
// imgpath.value='https://s1.ax1x.com/2022/04/22/LggL11.jpg'
const firstpag=ref('')
function getfirstpag(){
    let firstpagword=html.match(matchfirstpag)
    if(firstpagword!=null){
        firstpag.value=firstpagword[0]
    }
}
const title=ref(props.title)
const time=ref(props.time)
// 下面这个是用来处理时间格式的
var showtime=computed(()=>{
    let arr=time.value.split('/').slice(0,3)
    return arr.join('-')
})

// console.log(showtime.value)
// const testimgurl='https://s1.ax1x.com/2022/04/13/LMOUgI.png'
// const testtittle='文章名字文章名字文章名字文章名字文章名字文章名字文章名字文章名字文章名字文章名字文章名字文章名字'

// const articlecontent='文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容'

function changepage(){
    router.push('/'+props.uid)
}
onMounted(()=>{
    getimgpath()
    getfirstpag()
})
</script>
<style lang="scss" scoped>
.figuretitlecontent{
    // min-width: 600px;
    border-bottom: 1px solid gray;
    margin-bottom: 5px;
}
.firstimg{
  width: 100%;
  height: 0;
  padding-bottom: 60%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}
.imgcontent{
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
}
.titleword{
    padding: 35px 42px 49px 42px;
}
.articletitle{
    width: 100%;
    font-size: 32px;
    cursor: pointer;
    .titlestyle{
        font-weight: bolder;
    }
    &:hover{
        color: gray;
    }
}
.articletime{
    margin: 14px 0 0 14px;
    color: gray;
    cursor: pointer;
    font-size: 14px;
    &:hover{
        color: black;
    }
}
.articleintroduction{
    margin-top: 21px;
    font-size: 18px;
    line-height: 1.75;
    color: gray;
}
</style>
