const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://localhost:27017';


router.get('/getRooms', function(request, response, next){

  mongoClient.connect(mongoUrl, function(error, database){
    const outPut = database.db('bookingdb').collection('rooms').find();

    outPut.toArray(function(err, data) {
      response.json({'rooms' : data});
    });

    database.close();
  });

});

router.post('/insertReservation', function(request, response, next){

  const inputData = {
    name: request.body.name,
    room: request.body.room
  };

  mongoClient.connect(mongoUrl, function(error, database){
    database.db('bookingdb').collection('reservations').insertOne(inputData, function(error, result){
      if (error){
       console.log('hahahaha');
     }
     else{
       console.log('hohohohho');
     }
    database.close();
    });
  });

});

module.exports = router;
