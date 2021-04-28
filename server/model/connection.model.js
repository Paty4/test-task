const mysql = require('mysql');

const connectionDB = mysql.createConnection({
    host: 'localhost',//сервер
    user: 'root',     //пользователь
    password: '',  //Ваш пароль
    database: 'testdb'  //Название базы
});

connectionDB.connect((err) => {
    if (err) throw err;
    console.log('connected');
});



module.exports = connectionDB;
