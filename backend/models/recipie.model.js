var db = require('../db')
// var db_mssql = require('../db_mssql');

module.exports = {
    getAllRecipies: function(criteria, callback){

        var query = '';

        console.log("db query getAll")
        if (criteria){
            console.log(`with criteria: ${criteria}`);
            query = "SELECT R.*, u.id as user_id FROM recipies as R JOIN users AS U on U.id = R.author_id ORDER BY R." + criteria;
        }else{
            query = "SELECT R.*, u.id as user_id FROM recipies as R JOIN users AS U on U.id = R.author_id";
        }

        db.query(query, callback);
    },
    getById: function(dish_id, callback){
        console.log("db query getbyID "+ dish_id)
        db.query(`SELECT R.*, U.login FROM recipies as R 
        JOIN users AS U on U.id = R.author_id 
        WHERE R.id = ${dish_id}`, callback)
    },
    add: function(data, callback){

        var query = `INSERT INTO recipies 
        (dish_kind, difficulty, ingredients, time, description, photo, author_id, name, execution)
        VALUES 
        ('${data['dish_kind']}', ${data['difficulty']}, '${data['ingredients']}', ${data['execution_time']}, '${data['description']}', '${data['photo']}', ${data['user_id']}, '${data['name']}', '${data['execution']}')`
        
        db.query(query, callback)
    },
    update: function(data, callback){
        console.log('model function');
        var query = `UPDATE recipies SET 
        dish_kind = '${data['dish_kind']}', 
        difficulty = ${data['difficulty']}, 
        ingredients = '${data['ingredients']}', 
        execution = '${data['execution']}',
        time = ${data['time']},
        description = '${data['description']}',
        photo = '${data['photo']}',
        name = '${data['name']}'
        WHERE id = ${data['id']}`;

        db.query(query, callback);
    },
    delete: function(dish_id, callback){
        db.query(`DELETE FROM recipies WHERE id = ${dish_id}`, callback);
    },
    getComments: function(dish_id, callback){
        db.query(`SELECT c.*, u.login 
        from comments as c 
        join comments_users as cu on c.id = cu.comment_id 
        join users as u on u.id = cu.user_id 
        join recipies as r on r.id = c.recipie_id
        where r.id = ${dish_id}`, callback);
    },
    comment: function(dish_id, user_id, comment, callback){

        let yourDate = new Date()
        



        db.query(`INSERT INTO comments (content, date, recipie_id) VALUES ('${comment}', '${yourDate.toISOString().split('T')[0]}', ${dish_id}) RETURNING id`, function(err, result) {
            if (err){
                throw err;
            }
            const comment_id = result.rows[0].id;

            db.query(`INSERT INTO comments_users (user_id, comment_id) VALUES (${user_id}, ${comment_id})`, callback);

        });
        
    },
    countComments(dish_id, callback){

        db.query(``);

    }
}