const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://localhost:27017';


router.get('/getData', function(request, response, next){

  var resultArray = [];

  mongo.connect(mongoUrl, function(error, database){
    var outPut = database.db('bookingdb').collection('rooms').find();
    outPut.toArray(function(err, students) {
              // so now, we can return all students to the screen.
              response.status(200).json({'rooms' : students});
           });

           database.close();

  });

});

router.post('/insertData', function(request, response, next){

  const inputData = {
    name: request.body.name,
    room: request.body.room
  };

  mongo.connect(mongoUrl, function(error, database){
    database.db('bookingdb').collection('reservations').insertOne(inputData, function(error, result){
      if (error){
       console.log('hahahaha');
     }else{
      console.log('hohohohho');
    }
    database.close();
    });
  });
});

module.exports = router;
