/**
 * Created by mpbil on 4/8/2017.
 */
let catch404=function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
};
module.exports=catch404;