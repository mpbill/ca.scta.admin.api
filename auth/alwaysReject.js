let alwaysReject=function (req, res, next) {
    res.sendStatus(401);
};
module.exports=alwaysReject;