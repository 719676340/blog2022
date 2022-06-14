import {get,post} from'./ajax'
// 获取category列表
export const categorylist=()=>get('/categorylist');
// 获取tag列表
export const taglist=()=>get('/taglist');
// 新建category分类
export const newcategory=({categoryname})=>post('/newcategory',{categoryname});
// 新建tag分类
export const newtag=({tagname})=>post('/newtag',{tagname});
// 获取category的文章列表
export const getarticlebycategory=(name)=>get('/getarticlebycategory',{category:name})
// 获取tag的文章列表
export const getarticlebytag=(name)=>get('/getarticlebytag',{tag:name})
// 更改文章的隐藏状态 0显1隐藏
export const changehide=({uid,showsign})=>post('/changehide',{uid,showsign});
// 保存文章
export const newarticle=({uid,title,category,tag,date,show,content})=>post('/newarticle',{uid,title,category,tag,date,show,content});
// 拿文章信息
export const getarticle=(uid)=>get('/getarticle',{uid:uid})
// 更新文章的信息
export const modifyarticle=(uid,title,category,tag,content)=>post('/modifyarticle',{uid:uid,title:title,category:category,tag:tag,content:content});

// 下面是前端的内容
// 分类里面的部分文章的加载
export const getarticlebycategorylimit=(category,start,num)=>get('/getarticlebycategorylimit',{category:category,start:start,num:num})
// 首页里面的文章 也就是全部文章的部分加载
export const getarticlelimit=(start,num)=>get('/getarticlelist',{start:start,num:num})
// tag里面的部分文章的加载
export const getarticlebytaglimit=(tag,start,num)=>get('/getarticlebytaglimit',{tag:tag,start:start,num:num})

// 上面会造成文章重复加载的问题
// 更改的思路是，先全部加载，然后再在前端去操作加载的内容
export const getallarticle=()=>get('/getallarticle')
