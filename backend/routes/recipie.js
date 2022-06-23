var express = require('express');
var router = express.Router();
var controller = require('../controllers/recipie.controller');

/* GET home page. */
router.get('/', controller.index);
router.get('/by/:criteria', controller.index);
router.get('/edit/:id', controller.update);
router.get('/details/:id', controller.details);
router.post('/create/', controller.create);
router.get('/:id/comments/', controller.comments);
router.post('/:id/comment', controller.comment);
router.put('/update/', controller.update);

router.delete('/delete/:id', controller.delete);

module.exports = router;
