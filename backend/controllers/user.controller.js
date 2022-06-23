const UserModel = require('../models/user.model');

module.exports = {
    login: function(req, res){

        const {email, password} = req.body;

        console.log(email, password);

        UserModel.authenticate(email, password, function(err, result){
            if(err){
                throw err;
            }

            if (result.rows.length == 0){
                return res.status(404).send('Bad credentials');
            }
            req.session.user = result.rows[0];

            return res.json(result.rows[0]);

        });
    },
    login_test: function(req, res){

        req.session.user = "User in session";

        res.send('done')
    },
    delete: function(req, res){
        const user_id = req.params.id;

        UserModel.delete(user_id, function(err, result){
            if (err){
                throw err;
            }

            return res.json({message: "Użytkownik usunięty pomyślnie"});

        });
    },
    create: function(req, res){
        user = req.body;
        
        UserModel.create(user, function(err, result){
            if (err){
                throw err;
            }

            return res.json({message: "Użytkownik zarejestrowany pomyślnie."});

        });
    },
    logout: function(req, res){

        req.session.destroy();

        res.json({message: "Użytkownik wylogowany pomyślnie."});

    }
}