const { json } = require('express');
const RecipieModel = require('../models/recipie.model');

module.exports = {
    index: function(req, res){

        var criteria = false;

        if(req.params.criteria){
            
           criteria = req.params.criteria;
        }

        RecipieModel.getAllRecipies(criteria, function(err, result){

            if (err){
                throw err;
            }

            console.log("Session: %j", req.session.user);

            res.json(result.rows);

        });
        
    },
    details: function(req, res){
        var dish_id = req.params.id;

        RecipieModel.getById(dish_id, function(err, result){
            if (err){
                throw err;
            }
            res.json(result.rows[0]);

        });
    },
    create: function(req, res){
        const data = req.body;

        if (!req.session.user){
            return res.status(401).send("Użytkownik niezalogowany.");
        }

        Object.assign(data, {user_id: req.session.user['id']})
        
        console.log(data);

        RecipieModel.add(data, function(err, result){
            if (err){
                throw err;
            }
            
            return res.json({message: "Recipie added successfully"});

        })


    },
    update: function(req, res){
        const data = req.body;

        console.log('recieved form data. Data:');
        console.log(data);

        if (!req.session.user){
            return res.status(401).send("Użytkownik niezalogowany.");
        }

        RecipieModel.update(data, function(err, result){
            if (err){
                throw err;
            }
            
            return res.json({message: "Przepis edytowany pomyślnie."});

        })
    },
    delete: function(req, res){
        if (!req.session.user){
            return res.status(401).send("Użytkownik niezalogowany.");
        }

        var dish_id = req.params.id;

        RecipieModel.delete(dish_id, function(err, result){
            if (err){
                throw err;
            }

            return res.json({message: "Przepis usunięty pomyślnie."})
        });

    },
    comments: function(req, res){
        var dish_id = req.params.id;

        RecipieModel.getComments(dish_id, function(err, result){

            if (err){
                throw err;
            }

            res.json(result.rows);

        });
    },
    comment: function(req, res){
        const comment = req.body.comment;
        const dish_id = req.params.id;


        if (!req.session.user){
            return res.status(401).send("Tylko zalogowany użytkownik może komentować przepisy.");
        }

        const user_id = req.session.user.id;

        RecipieModel.comments(dish_id, user_id, comment, function(err, result){
            if (err){
                throw err;
            }
            
            console.log("sending response");
            res.json({message: "Komentarz dodany pomyślnie."});

        });

    }

}