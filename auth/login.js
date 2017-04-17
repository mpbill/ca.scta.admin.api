/**
 * Created by mpbil on 4/8/2017.
 */
let bcrypt = require('bcrypt');
let getCollection = require('../connection/getCollection');
let jwt = require('jsonwebtoken');
let jwtSecret='ThisIsTheSecretBitches';
const userCollection = 'users';
const cookieName='scta_auth';
let moment = require('moment');
let compareUserPassword=function (user,password) {
    return new Promise(function (pass, fail) {
        bcrypt.compare(password,user.password,function (err, res) {
            if(err || !res){
                fail(err || 'passwords did not match');
            }
            pass({
                user:user
            });
        })
    });
};
let generateToken = function (user) {
    console.log(user);
    let token = jwt.sign({
        userId: user._id,
        username: user.username

    },jwtSecret,{ expiresIn: 60 * 60 });
    return token;
};
let oneHour=1000*60*60;
let login = function (req,res,next) {
    getCollection(userCollection)
    .then(coll=>coll.findOne({username:req.body.username}))
    .then(user=>compareUserPassword(user,req.body.password))
    .then(user=>generateToken(user.user))
    .then(token=>{
        res.cookie(cookieName,token,{maxAge:oneHour});
        res.sendStatus(200);
    })
    .catch(err=>{
        console.log(err);
        res.send({message:'username or password incorrect'});
    });
};
let parseTokenOffRequest=function (req, res, next) {
    jwt.verify(req.cookies[cookieName],jwtSecret,function (err, decoded) {
        if(err){
            req.user=null;
            next();
        }
        else{
            req.user=decoded;
            next();
        }
    });
};
let authenticate=function (req, res, next) {
    if(req.user){
        next();
    }
    else{
        res.sendStatus(401);
    }

};
module.exports={
    authenticate:authenticate,
    login:login,
    parseTokenOffRequest:parseTokenOffRequest
};
