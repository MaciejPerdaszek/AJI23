const Product = require('../models/productModel');
const {StatusCodes} = require('http-status-codes');

exports.getProducts = (req, res) => {
    Product.getAll().then(
        function(allProducts) {
            res.status(StatusCodes.OK).json(allProducts);
        }
    );
}

exports.getProductById = (req, res) => {
    Product.getById(req.params.id).then(
        (product) => {
            res.status(StatusCodes.OK).json(product);
        }
    );
};

exports.addProduct = (req, res) => {
    let productVars = req.body;
    if(validateProduct(productVars, res)) {
            Product.create({
            'name': productVars.name,
            'description': productVars.description,
            'price': productVars.price,
            'weight': productVars.weight,
            'idcategory': productVars.idcategory,
        }).then(newProductId => {
            if (newProductId == null) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error while creating product' });
            }
            res.status(StatusCodes.CREATED).json({newProductId: newProductId}); }
        );
        }   
    }


exports.updateProduct = (req, res) => {
    let productId = req.params.id;
    let productVars = req.body;
    if(validateProduct(productVars, res)) {
        Product.getById(productId).then(
            (product) => {
                
                if (product == null) {
                    return res.status(StatusCodes.NOT_FOUND).json({ error: 'Product not found' });
                }
                    Product.update(productId, productVars)
                .then((productId) => {
                    if(productId == null) {
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error while updating product' });
                    }
                    res.status(StatusCodes.ACCEPTED).json(productId);
                });
            
            });
            
    }
};

const validateProduct = (product, res) => {
    if(product.name == null || product.description == null || product.price == null || product.weight == null || product.idcategory == null) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Variables cannot be null' });
        return false;
    }
    if(product.price <= 0 || product.weight <= 0) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Price and weight must be greater than 0' });
        return false;
    }
    if(product.name.trim() === '' || product.description.trim() === '') {
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Name and description cannot be empty' });
        return false;
    }
    return true;
}
    