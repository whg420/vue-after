const mysql = require('mysql');

const connection = mysql.createConnection({
    user:"root",
    host:"localhost",
    port:"3306",
    password:"root",
    database:'1705d'
})


connection.connect((error)=>{
    if (error){
        console.log("链接失败")
    }else{
        console.log("链接成功")
    }
})

module.exports = connection;