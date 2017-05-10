let getCollection = require('../connection/getCollection');
let express = require('express');
let ObjectId = require('mongodb').ObjectId;
let router = express.Router();
let authenticate = require('../auth/login').authenticate;
let allowed=["addresses","meetingGroups"];
let arrayToObj=require('../helpers/arrayToObject');
let allowedMiddleware=function (req, res, next) {
    if(allowed.indexOf(req.params.name)===-1){
        next('router');
    }
    else{
        next();
    }
};
// router.use(authenticate);
router.get('/:name',allowedMiddleware,function(req, res,next) {
    getCollection(req.params.name)
    .then((coll)=>coll.find({}).toArray())
    .then((docs)=>res.send(arrayToObj(docs)));
});
// router.get('/:name/:id',allowedMiddleware,function (req, res) {
//     getCollection(req.params.name)
//     .then((coll)=>coll.findOne({_id:new ObjectId(req.params.id)}))
//     .then((doc)=>res.send(doc));
// });
router.post('/:name',allowedMiddleware,function (req,res) {
    getCollection(req.params.name)
    .then((coll)=>coll.insertOne(req.body))
    .then((r)=>res.send({id:r.insertedId}));

});
router.put('/:name/:id',allowedMiddleware,function (req, res) {
    getCollection(req.params.name)
    .then((coll)=>coll.replaceOne({_id:new ObjectId(req.params.id)},req.body))
    .then((r)=>res.send({_id:r.upsertedId}));
});
router.delete('/:name/:id',allowedMiddleware,function (req, res) {
    getCollection(req.params.name)
    .then((coll)=>coll.deleteOne({_id:new ObjectId(req.params.id)}))
    .then((r)=>res.send({_id:req.params.id}));
});


module.exports=router;