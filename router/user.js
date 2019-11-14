const router = require('koa-router')();

// if (page < 1) {
//     console.log(参数错误)
// } else {
//     pageSize = pageSize * 1;
//     page = (page * 1 - 1) * pageSize;
//     let result = await this.app.mysql.select('person', { limit: pageSize, offset: page });
//     let count = await this.app.mysql.query('select count(*) as count from person');
//     return { result, count };
// }

router.get('/api/list', async (ctx) => {
    let { page = 1, pageSize = 2 } = ctx.request.query;
    pageSize = pageSize * 1;
    page = (page * 1 - 1) * pageSize;
    let count = await ctx.mysql.query('select count(*) as count from bannerlist');
    let data = await ctx.mysql.query(`select * from bannerlist limit ${page},${pageSize}`);
    ctx.body = {
        code:1,
        data,
        total:count[0].count
    };
})

router.get('/api/get', async (ctx) => {
    let {id} = ctx.request.query;
    let data = await ctx.mysql.query(`SELECT * FROM bannerlist WHERE id=${id}`);
    ctx.body = {
        code: 1,
        data
    };
})

//添加数据库
router.post('/api/add', async (ctx) => {
    let { url, message } = ctx.request.body;
    if (url) {
        let urlarr = await ctx.mysql.query('select * from bannerlist where url=?', [url]);
        if (urlarr.length) {
            ctx.body = {
                code: 0,
                msg: "用户已存在"
            }
        } else {
            let data = await ctx.mysql.query('insert into bannerlist (message,url) values (?,?)', [message, url]);
            if (data.message === "error") {
                ctx.body = {
                    code: 0,
                    msg: data.error
                }
            } else {
                ctx.body = {
                    code: 1,
                    msg: "添加成功"
                }
            }
        }
    } else {
        ctx.body = {
            code: 2,
            msg: "参数缺失"
        }
    }
})

router.get('/api/del', async (ctx) => {
    let { id } = ctx.request.query;
    let data = await ctx.mysql.query(`DELETE FROM bannerlist where id=${id}`);
    if (data.message === "error") {
        ctx.body = {
            code: 0,
            msg: data.error
        }
    } else {
        ctx.body = {
            code: 1,
            msg: "删除成功"
        }
    }
})

router.post('/api/updata', async (ctx) => {
    let { id, message, url } = ctx.request.body;
    if (id) {
        let idarr = await ctx.mysql.query('select * from bannerlist where id=?', [id]);
        if (idarr.length) {
            let data = await ctx.mysql.query('UPDATE bannerlist SET message = ?,url = ? WHERE id = ?', [message, url, id]);
            if (data.message === "error") {
                ctx.body = {
                    code: 0,
                    message: data.error
                }
            } else {
                ctx.body = {
                    code: 1,
                    message: "成功"
                }
            }
        }
    } else {
        ctx.body = {
            code: 0,
            msg: '数据不存在'
        }
    }
})

module.exports = router;