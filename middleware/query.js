const Connection = require('../db/db');

let query = (sql,params=[]) =>{
    return new Promise((reslove,reject)=>{
        Connection.query(sql,params,(error,data)=>{
            if(error){
                reject(error)
            }else{
                reslove(data)
            }
        })
    })
}

module.exports = () => {
    return async (ctx,next) => {
        ctx.mysql = {};
        ctx.mysql.query = query;
        await next();
    }
}