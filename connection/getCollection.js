let MongoClient = require('mongodb').MongoClient;
let os = require('os');
const authenticatedString='mongodb://adminApiUser:password@localhost:27017/scta';
const unauthenticatedString="mongodb://localhost:27017/scta";

const hostname=os.hostname();
const connectionString = hostname==='DEVLPTP12'?unauthenticatedString:authenticatedString;


let getCollection = function (collectionName) {

    return MongoClient.connect(connectionString).then(db=>db.collection(collectionName));
};

module.exports=getCollection;