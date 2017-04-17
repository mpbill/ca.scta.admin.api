let express = require('express');
let router = express.Router();
let authenticate = require('../auth/login').authenticate;

let login = require('../auth/login').login;
/* GET home page. */
router.post('/login',login);
router.get('/',authenticate,function (req, res, next) {
    res.send('it worked');
});
router.get('/user',authenticate,function (req, res, next) {
    res.send(req.user);
});

module.exports = router;
