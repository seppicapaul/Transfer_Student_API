var mysql      = require('mysql');

/*
var connection = mysql.createConnection({
//    debug: true,

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});
*/

var connection = mysql.createConnection({
//    debug: true,

    host: '10.5.5.102',
    port: 3306,
    user: 'mkrent',
    password: '37Data0Base14',
    database: 'draught_services'
});

module.exports = connection;
