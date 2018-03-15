// Importing libraries
const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');

// Url to database
const mongoUrl = 'mongodb://localhost:27017';

// Read all records in reservations collection
router.get('/getReservations', function(request, response, next){
  mongoClient.connect(mongoUrl, function(error, database){
    const outPut = database.db('bookingdb').collection('reservations').find();

    outPut.toArray(function(error, data) {
      if(error){
        response.status(500).json(error);
      }
      else{
        response.status(200).json({'reservations' : data});
      }
    });

    database.close();
  });
});

// Read all records in rooms collection
router.get('/getRooms', function(request, response, next){
  mongoClient.connect(mongoUrl, function(error, database){
    const outPut = database.db('bookingdb').collection('rooms').find();

    outPut.toArray(function(error, data) {
      if(error){
        response.status(500).json(error);
      }
      else{
        response.status(200).json({'rooms' : data});
      }
    });

    database.close();
  });
});

// Create a new record in reservations collection
router.post('/insertReservation', function(request, response, next){
  const inputData = {
    name: request.body.name,
    duration: request.body.duration
  };

  mongoClient.connect(mongoUrl, function(error, database){
    database.db('bookingdb').collection('reservations').insertOne(inputData, function(error, result){
      if(error){
        response.status(500).json(error);
      }
      else{
        response.status(200).json({message: 'Record inserted'});
      }
      database.close();
    });
  });
});

// Create a new record in rooms collection
router.post('/insertRoom', function(request, response, next){
  const inputData = {
    room: request.body.room,
    size: request.body.size
  };

  mongoClient.connect(mongoUrl, function(error, database){
    database.db('bookingdb').collection('rooms').insertOne(inputData, function(error, result){
      if(error){
        response.status(500).json(error);
      }
      else{
        response.status(200).json({message: 'Record inserted'});
      }
      database.close();
    });
  });
});

// Deletes one or more records in reserverations collection
router.delete('/deleteReservation', function(request, response, next){

  var arrId = [];
  var inputArray = request.body._id;

  if(Array.isArray(inputArray)){
    for(var i = 0; i < inputArray.length; i++){
      arrId[i] = mongodb.ObjectID(inputArray[i]);
    }
  }
  else{
    arrId[0] = mongodb.ObjectID(inputArray);
  }

  mongoClient.connect(mongoUrl, function(error, database){
      database.db('bookingdb').collection('reservations').deleteMany({_id: {$in: arrId}}, function(error, result){
        if(error){
          response.status(500).json(error);
        }
        else{
          response.status(200).json({message: 'Record deleted'});

        }
        database.close();
      });
  });

});

// Deletes one or more records in rooms collection
router.delete('/deleteRooms', function(request, response, next){

  var arrId = [];
  var inputArray = request.body._id;

  if(Array.isArray(inputArray)){
    for(var i = 0; i < inputArray.length; i++){
      arrId[i] = mongodb.ObjectID(inputArray[i]);
    }
  }
  else{
    arrId[0] = mongodb.ObjectID(inputArray);
  }

  mongoClient.connect(mongoUrl, function(error, database){
      database.db('bookingdb').collection('rooms').deleteMany({_id: {$in: arrId}}, function(error, result){
        if(error){
          response.status(500).json(error);
        }
        else{
          response.status(200).json({message: 'Record deleted'});

        }
        database.close();
      });
  });

});

// Update a record in reservations collection
router.patch('/updateReservation/:reservationId', function(request, response, next){
  const resId = {_id: mongodb.ObjectID(request.params.reservationId)};
  const updateObj = {$set: request.body};

  mongoClient.connect(mongoUrl, function(error, database){
    database.db('bookingdb').collection('reservations').updateOne(resId, updateObj, function(error, result){
      if (error){
        response.status(500).json(error);
      }
      else{
        response.status(200).json({message: 'Record update'});
      }
      database.close();
    });

  });
});

// Update a record in rooms collection
router.patch('/updateRooms/:roomId', function(request, response, next){
  const roomId = {_id: mongodb.ObjectID(request.params.roomId)};
  const updateObj = {$set: request.body};

  mongoClient.connect(mongoUrl, function(error, database){
    database.db('bookingdb').collection('rooms').updateOne(roomId, updateObj, function(error, result){
      if (error){
        response.status(500).json(error);
      }
      else{
        response.status(200).json({message: 'Record update'});
      }
      database.close();
    });

  });
});


module.exports = router;
