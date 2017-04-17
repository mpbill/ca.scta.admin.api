let MongoClient = require('mongodb').MongoClient;

let getCollection = function (collectionName) {
    return MongoClient.connect('mongodb://adminApiUser:password@localhost:27017/scta').then(db=>db.collection(collectionName));
};

module.exports=getCollection;