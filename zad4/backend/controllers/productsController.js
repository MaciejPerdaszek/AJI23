const Product = require('../models/productModel');

exports.getProducts = (req, res) => {
    Product.getAll().then(
        function(allProducts) {
            res.json(allProducts);
        }
    );
}

exports.getProductById = (req, res) => {
    Product.getById(req.params.id).then(
        function(product) {
            res.json(product);
        }
    );
};

exports.addProduct = (req, res) => {
    const newProduct = Product.create({
        'name': req.body.name,
        'description': req.body.description,
        'price': req.body.price,
        'weight': req.body.weight,
        'idcategory': req.body.idcategory,
    }).then(function() {
        res.json({
            'status':'saved!',
            'product': newProduct,
        });
    });
};

exports.updateProduct = (req, res) => {
  Product.findbyIdAndUpdate(req.params.id, req.body, { new: true })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

