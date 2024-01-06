const Order = require('../models/orderModel');

exports.getOrders = (req, res) => {
    Order.getAll().then(
        function(allOrders) {
            res.json(allOrders);
        }
    );
}

exports.createOrder = (req, res) => {
    const newOrder = Order.create({
        'date': req.body.date,
        'status': req.body.status,
        'username': req.body.username,
        'email': req.body.email,
        'phone_number': req.body.phone_number,
        'list': req.body.list,
        'amount': req.body.amount,
    }).then(function() {
        res.json({
            'status':'saved!',
            'order': newOrder,
        });
    });
}

exports.updateOrder = (req, res) => {
    Order.findbyIdAndUpdate(req.params.id, req.body, { new: true })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });
}

exports.getOrdersbyStatus = (req, res) => {
    Order.getOrdersByStatus(req.params.id).then(
        function(allOrders) {
            res.json(allOrders);
        }
    );
}

