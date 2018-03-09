const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://localhost:27017/bookingdb';

router.get('/getData', function(request, response, next){

  var resultArray = [];

  console.log('HEHEHEHE');
  mongo.connect(mongoUrl, function(error, database){
    const cursor = database.collection('rooms').find().pretty();
    cursor.forEach(function(data, error){
      resultArray.push(data);
      console.log('JOOOODA');
    },
    function(){
      database.close();
      response.json({cursor});
      console.log('HOHOHOHOHO');
    });
  });
});

router.post('/insertData', function(request, response, next){

  mongo.connect(mongoUrl, function(error, database){

    database.collection('reservations').insertOne(request.body, function(error, result){
      if (error){
       console.log(error);
     }else{
      console.log(error);
    }
    });
  });
});

module.exports = router;
