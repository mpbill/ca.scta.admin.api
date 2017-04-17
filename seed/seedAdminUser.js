/**
 * Created by mpbil on 4/8/2017.
 */
let bcrypt = require('bcrypt');
let getCollection = require('../connection/getCollection');
let seedAdminUser = function () {
    let admin = {
        username:'admin',
        password:'password'
    };
    bcrypt.hash(admin.password,5).then(hash=>{
        getCollection('users').then(coll=>coll.update({username:admin.username},{username:admin.username,password:hash},{upsert:true}));
    });

};
module.exports=seedAdminUser;