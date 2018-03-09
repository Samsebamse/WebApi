const express = require('express');
const router = express.Router();

router.get('/', function(request, response, next){
  response.status(200).json({
    message: 'Orders were fetched'
  });
});

router.post('/', function(request, response, next){
  response.status(201).json({
    message: 'Order was created'
  });
});

router.get('/:orderId', function(request, response, next){
  response.status(200).json({
    message: 'Order details',
    orderId: request.params.orderId
  });
});

router.delete('/:orderId', function(request, response, next){
  response.status(200).json({
    message: 'Order deleted',
    orderId: request.params.orderId
  });
});

module.exports = router;
