var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');


/* GET users listing. */
router.post('/login', controller.login);
router.delete('/delete/:id', controller.delete);
router.post('/register', controller.create)
router.get('/logout', controller.logout)

module.exports = router;
