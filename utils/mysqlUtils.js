
//数据库连接配置
var conifg = {
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'novel',
    connectionLimit : 50
}

const mysql = require('mysql');

var pool = mysql.createPool(conifg); //创建连接池

module.exports = execSQl;

function execSQl(sql) {
    //获取连接池中闲置的连接
    pool.getConnection(function (err,connect) {
        if(err){
            throw err;
        }
        connect.query(sql, function(err, results, fields) {
            if (err) throw err;
            console.log('查询结果为: ', results);
        });
        //释放连接
        connect.release();
    });
}





// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '123456',
//   database : 'dbgirl'
// });

// connection.connect();

// connection.query('select * from `girl`', function(err, rows, fields) {
//     if (err) throw err;
//     console.log('查询结果为: ', rows);
// });
// //关闭连接
// connection.end();