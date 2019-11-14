const Koa = require('koa');
const app = new Koa();

//1.配置静态资源
const static = require('koa-static');
const path =require('path');

//2.post请求配置
const bodyparser = require('koa-bodyparser');

//3.路由规则
const router = require('./router');
const query = require('./middleware/query');

//静态资源和接口
app.use(static(path.join(process.cwd(),'static')));
app.use(bodyparser()); //ctx.request.body
app.use(query()); //ctx.mysql.query 
app.use(router.routes()).use(router.allowedMethods());


app.listen(7001,()=>{
    console.log('open server http://lcoalhost:7001')
})