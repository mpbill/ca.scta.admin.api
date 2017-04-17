let express = require('express');

let makeRouter=function () {
    let router = express.Router();
    let returnTrue=function (req, res, next) {

        console.log("stuff");
        res.send(true);
    };
    router.get('/a',returnTrue);
    router.get('/b',returnTrue);
    return router;
};


module.exports = makeRouter;