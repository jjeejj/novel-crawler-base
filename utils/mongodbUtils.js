const mongodb = require('mongodb');

/**
 * 连接数据库
 */

var MongoClient  = mongodb.MongoClient;

MongoClient.connect('mongodb://localhost:27017/novel',function (err,db) {

    if(err){
        console.log(err)
    }

    console.log("Connected successfully to server");

    var collection = db.collection('novle');

    collection.insertMany([{a : 1}, {a : 2}, {a : 3}],function (err, result) {
        console.log("Inserted 3 documents into the collection");
        db.close();
    })

    
})