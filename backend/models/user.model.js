var db = require('../db')

module.exports = {
    getUsers: function(callback){
        db.query("SELECT * FROM users", callback);
    },
    authenticate: function (email, password, callback){
        console.log("db query authenticate");
        db.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`, callback);
    },
    delete: function(id, callback){

        db.query(`DELETE FROM users WHERE id = ${id}`, callback);
    },
    create: function(user, callback){
        db.query(`INSERT INTO users 
        (login, email, password, role_id) VALUES 
        ('${user['login']}', '${user['email']}', '${user['password']}', 1)`, callback);
    }
}