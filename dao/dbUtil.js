var mysql = require('mysql');

function createConnection(){
    var connection = mysql.createConnection({
        host: '192.168.0.106',
        port: '3306',
        user: 'root',
        password: '123123',
        database: 'my_blog'
    });
    return connection;
}

module.exports.createConnection = createConnection;



