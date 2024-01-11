const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const OrderProduct = require('../models/orderProductModel');

const {statuses} = require('./statusController')

const {StatusCodes} = require('http-status-codes');
const { json } = require('body-parser');

exports.getOrders = (req, res) => {
    Order.getAll().then(
        function(allOrders) {
            for (let order of allOrders) {
                const orderProducts = OrderProduct.getByOrderId(order.id).then(
                    function(orderProducts) {
                        order.products = orderProducts;
                    }
                );
            }
            res.status(StatusCodes.OK).json(allOrders);
        });
}

exports.createOrder = (req, res) => {
    let orderVars = req.body;
    validateNewOrder(orderVars, res).then(
        (valid) => {
            if(valid) {
                Order.create({
                    'date': orderVars.date,
                    'status': orderVars.status,
                    'username': orderVars.username,
                    'email': orderVars.email,
                    'phone_number': orderVars.phone_number,
                    'products': orderVars.products,
                }).then(newOrderId => {
                    res.status(StatusCodes.CREATED).json({newOrderId: newOrderId}); });
            }
        });
    }

exports.updateOrder = (req, res) => {
    let orderId = req.params.id;
    let orderVars = req.body;
    Order.getById(orderId).then(
        async (order) => {
            if (!order) {
                return res.status(StatusCodes.NOT_FOUND).json({ error: 'Order not found' });
            }
            let updateValidate = await validateUpdateOrder(order.toJSON(), orderVars, res);
            if(updateValidate) {
                Order.update(orderId, orderVars);
                res.status(StatusCodes.ACCEPTED).json(orderId);
            }
        });
    }

exports.getOrdersbyStatus = (req, res) => {
    Order.getOrdersByStatus(req.params.id).then(
        (allOrders) => {
            res.status(StatusCodes.OK).json(allOrders);
        }
    );
}

const validateNewOrder = async (order, res) => {
    if(order.date == null || order.status == null || 
        order.username == null || order.email == null || 
        order.phone_number == null ||  order.products == null) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Variables cannot be null' });
        return false;
    }
    const phoneRegex = new RegExp('^[0-9]{9}$');
    if(!phoneRegex.test(order.phone_number)) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Phone number is invalid' });
        return false;
    }
    const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
    if(!emailRegex.test(order.email)) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Email is invalid' });
        return false;
    }
    if(order.username == '') {
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Username cannot be empty' });
        return false;
    }
    for (let product of order.products) {
        if(product.product_id == null || product.amount == null) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: 'Product variables cannot be null' });
            return false;
        }
        if(product.amount <= 0) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: 'Product amount must be greater than 0' });
            return false;
        }
        let pid = await Product.getById(product.product_id);
        if (!pid) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: 'Product with id ' + product.product_id + ' does not exist' });
            return false;
        };
    }
    return true;
}

    const validateUpdateOrder = async (oldOrder, newOrder, res) => {
        if(!await validateNewOrder(newOrder, res)) {
            return false;
        }
        else if(oldOrder.status == statuses.CANCELED) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: 'Order was canceled and cannot be updated' });
            return false;
        }
        else if(oldOrder.status > newOrder.status) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: 'Order status cannot be downgraded' });
            return false;
        }
        else {
            return true;
        }
    }
