<template>
    <div class='page'>
        <div class="head">
            <div class="articletitle">
              <span class="titlestyle">{{info.title}}</span>
            </div>
            <div class="articletime">
                <span>{{showtime}}</span>
            </div>
        </div>
        <div class="htmlcontent" v-html="info.html"></div>
        <div class="foot">
            <div class="relate">
                <div class="relatetag">
                    <span class="tagword">相关</span>
                </div>
                <div class="relatenav">
                    <div class="relateitem" v-for="(item, index) in relate" :key="index" @click="changepage(item.uid)">
                        <div class="itemtitle">
                            <span>{{item.title}}</span>
                        </div>
                        <div class="itemtime">
                            <span>{{item.date}}</span>
                        </div>
                        <div class="itemcategory">
                            <span>In {{item.category}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="typenav">
                <div class="categorynav" @click="changetypepage('category',info.category)">
                    <i class="iconfont icon-sucai"></i>
                    <span>{{info.category}}</span>
                </div>
                <div class="tagnav" @click="changetypepage('tag',info.tag)">
                    <i class="iconfont icon-biaoqian" ></i>
                    <span>{{info.tag}}</span>
                </div>
                <div class="prevnext">
                    <div class="prevbotton" v-if="pre.length" @click="changepage(pre[0].uid)">
                        <div class="prevtag"><span>prev</span></div>
                        <div class="prevtitlename"><span>{{pre[0].title}}</span></div>
                    </div>
                    <div class="nextbotton" v-if="next.length" @click="changepage(next[0].uid)">
                        <div class="nexttag"><span>next</span></div>
                        <div class="nexttitlename"><span>{{next[0].title}}</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { nextTick, onMounted, reactive,inject, onActivated,computed} from 'vue';
import { useRouter, useRoute } from 'vue-router'
import {getarticle,getarticlebycategory,getarticlebytag} from '../api/index';// 导入我们的api接口
const router = useRouter()
const route = useRoute()
// console.log(route.params.uid)
const info=reactive({
    uid:'',
    title:'',
    time:'',
    html:'',
    category:'',
    tag:''
})
var showtime=computed(()=>{
    let arr=info.time.split('/').slice(0,3)
    return arr.join('-')
})
// const props=defineProps(['uid'])
// const testtittle='文章名字文章名'
// const category='工作'
// const tag='生活'
// const time='2022-4-13'
// const html='<p><img src="https://s1.ax1x.com/2022/04/13/LMOUgI.png" style="max-width:100%;" contenteditable="false" width="517.12" height="264.27"/><br/></p><p>&nbsp; &nbsp; 时间是这样过的比较快的<br/></p>'
// var relateitems=[{title:'相关文章',time:'2022-3-4',category:'生活'},{title:'相关文章',time:'2022-3-4',category:'生活'},{title:'相关文章',time:'2022-3-4',category:'生活'}]
var relate=reactive([])
var pre=reactive([])
var next=reactive([])
function getarticleinfo(uid){
    // console.log(props.uid)
    getarticle(uid).then((res)=>{
        info.uid=res[0].uid,
        info.title=res[0].title,
        info.time=res[0].date,
        info.html=res[0].content,
        info.category=res[0].category,
        info.tag=res[0].tag
    }).then(()=>{
        Promise.all([getarticlebycategory(info.category),getarticlebytag(info.tag)]).then((res)=>{
            let categoryarr=res[0].filter((item)=>item.showsign==0)
            relate.push(...categoryarr.slice(0,2))
            // console.log(categoryarr)
            for(let i=0;i<categoryarr.length;i++){
                if(categoryarr[i].uid==info.uid){
                    if(i-1>=0){
                        pre.push(categoryarr[i-1])
                    }
                    if(i+1<categoryarr.length){
                        next.push(categoryarr[i+1])
                    }
                }
            }
            let tagarr=res[1].filter((item)=>item.showsign==0)
            relate.push(...tagarr.slice(0,1))   
        })
    }).catch((err)=>{
        console.log(err)
    })
}
// 用promise的保证一定能读到info里面的数据
function getrelatearticle(){
    relate.splice(0)
    Promise.all([getarticlebycategory(info.category),getarticlebytag(info.tag)]).then((res)=>{
        console.log(res[0],info.category,info.tag)
        let categoryarr=res[0].filter((item)=>item.showsign==0)
        let categoryindex=Math.ceil((categoryarr.length-1)*Math.random())
        relate.push(...categoryarr.slice(categoryindex,categoryindex+2))
        
        let tagarr=res[1].filter((item)=>item.showsign==0)
        let tagindex=Math.ceil((tagarr.length-1)*Math.random())
        relate.push(...tagarr.slice(tagindex,tagindex+2))       
    }).catch((err)=>{
        console.log(err)
    })
}

function changepage(uid){
    router.push('/'+uid+'')
    // { path: '/user', params: { username } }
    // router.push({path:'/'+uid+'',params:{refresh: true}})
    // nextTick()
}
function changetypepage(type,name){
    router.push('/'+type+'/'+name+'')
}
onMounted(()=>{
    getarticleinfo(route.params.uid)
    // await getrelatearticle()
    // console.log()
})
</script>
<style>
img{
    max-width: 100%;
    height: auto;
}
</style>
<style lang="scss" scoped>
.page{
    min-width: 500px;
    width: 100%;
    max-width: 1000px;
    padding: 42px 40px;
}

.head{
    padding: 0 0 21px;
}
.articletitle{
    display: flex;
    height: 60px;
    justify-content: center;
    align-items: center;
    .titlestyle{
        font-size: 42px;
        font-weight: 500;
        line-height: 60px;
    }
}
.articletime{
    padding: 14px 0 0;
    display: flex;
    justify-content: center;
    font-size: 14px;
    color: gray;
}
.htmlcontent{
    max-width:100%;
    height:auto
    // clear: both;
}
.foot{
    margin: 18px 0;
    padding: 18px 0 0;
}
.relatetag{
    width: 40px;
    height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-top: 1px solid gray;
    margin-bottom: 12px;
    .tagword{
        font-size: 12px;
        font-weight: bold;
    }
}
.relatenav{
    height: 60px;
    display: flex;
    flex-direction: row;
    font-size: 12px;
}
.relateitem{
    flex: 0 0 calc(100%/3);
    color: grey;
    .itemtitle{
        height: 20px;
        cursor: pointer;
        &:hover{
            text-decoration:underline
        }
    }
    .itemtime{
        height: 20px;
    }
    .itemcategory{
        height: 20px;
    }
}
.typenav{
    padding: 35px 0 0;
    font-size: 12px;
    color: gray;
    span{
        margin-left: 5px;
    }
}
.categorynav{
    margin-bottom: 21px;
    cursor: pointer;
    &:hover{
        color: black;
    }
}
.tagnav{
    cursor: pointer;
    &:hover{
        color: black;
    }
}
.prevnext{
    width: 100%;
    padding: 20px 0 0;
    position: relative;
    // justify-content: flex-end;
    height: 50px;
    
}
.prevbotton{
    position: absolute;
    left: 0;
    flex: 0 1 50%;
    display: flex;
    flex-wrap: wrap;
    // align-self: flex-start;
    cursor: pointer;
    .prevtag{
        width: 100%;
        
    }
    .prevtitlename{
        font-size: 16px;
        span{
            font-weight: bold;
        }
    }
    &:hover{
        color: black;
    }

}
.nextbotton{
    position: absolute;
    right: 0;
    flex: 0 1 50%;
    flex-wrap: wrap;
    align-self: flex-end;
    cursor: pointer;
    .nexttag{
        display: flex;
        width: 100%;
        justify-content: flex-end;
    }
    .nexttitlename{
        display: flex;
        font-size: 16px;
        width: 100%;
        justify-content: flex-end;  
        span{
            font-weight: bold;
        }      
    }
    &:hover{
        color: black;
    }
}
</style>
