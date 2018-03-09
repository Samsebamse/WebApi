const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const mongoUrl = 'mongodb://localhost:27017'

router.get('/', function(request, response, next){
  console.log(request.params);
  response.status(200).json({
    message: 'GET requests to /products'
  });
});

router.post('/', function(request, response, next){
  console.log(request.body.navn);
  response.status(201).json({
    message: 'POST requests to /products'
  });
});

router.get('/:productId', function(request, response, next){
  const id = request.params.productId;
  if(id === 'special'){
    response.status(200).json({
      message: 'You discovered the special ID',
      id: id
    });
  } else{
    response.status(200).json({
      message: 'You passed an ID'
    });
  }
});

router.patch('/:productId', function(request, response, next){
  response.status(200).json({
    message: 'Updated product!'
  });
});

router.delete('/:productId', function(request, response, next){
  response.status(200).json({
    message: 'Deleted product!'
  });
});


module.exports = router;
