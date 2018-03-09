const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');

const mongoUrl = 'mongodb://localhost:27017';

router.get('/getReservations', function(request, response, next){
  mongoClient.connect(mongoUrl, function(error, database){
    const outPut = database.db('bookingdb').collection('reservations').find();

    outPut.toArray(function(err, data) {
      response.json({'reservations' : data});
    });

    database.close();
  });
});

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
    duration: request.body.duration
  };

  mongoClient.connect(mongoUrl, function(error, database){
    database.db('bookingdb').collection('reservations').insertOne(inputData, function(error, result){
      if(error){
        response.json(error);
      }
      else{
        response.status(200).json({message: 'Record inserted'});
      }
      database.close();
    });
  });
});

router.post('/insertRoom', function(request, response, next){
  const inputData = {
    room: request.body.room,
    size: request.body.size
  };

  mongoClient.connect(mongoUrl, function(error, database){
    database.db('bookingdb').collection('reservations').insertOne(inputData, function(error, result){
      if(error){
        response.json(error);
      }
      else{
        response.status(200).json({message: 'Record inserted'});
      }
      database.close();
    });
  });
});

router.delete('/deleteReservation/:reservationId', function(request, response, next){
  const resId = {_id: new mongodb.ObjectID(request.params.reservationId)};

  mongoClient.connect(mongoUrl, function(error, database){
    database.db('bookingdb').collection('reservations').deleteOne(resId, function(error, result){
      if(error){
        response.json(error);
      }
      else{
        response.status(200).json({message: 'Record deleted'});
      }
      database.close();
    });
  });

});

router.delete('/deleteRoom/:roomId', function(request, response, next){
  const roomId = {_id: new mongodb.ObjectID(request.params.roomId)};

  mongoClient.connect(mongoUrl, function(error, database){
    database.db('bookingdb').collection('reservations').deleteOne(roomId, function(error, result){
      if(error){
        response.json(error);
      }
      else{
        response.status(200).json({message: 'Record deleted'});
      }
      database.close();
    });
  });

});

router.patch('/updateReservation/:reservationId', function(request, response, next){
  const resId = {_id: new mongodb.ObjectID(request.params.roomId)};
  const updateObj = {$set: request.body};

  mongoClient.connect(mongoUrl, function(error, database){
    database.db('bookingdb').collection('reservations').updateOne(resId, updateObj, function(error, result){
      if (error){
        response.json(error);
      }
      else{
        response.status(200).json({message: 'Record update'});
      }
      database.close();
    });

  });
});




module.exports = router;
