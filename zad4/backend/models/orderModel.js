const bookshelf = require('../config/bookshelf');

const Order = bookshelf.Model.extend({
    tableName: 'orders'
    });

module.exports.getAll = () => {
    return Order.fetchAll();
}

module.exports.create = (order) => { 
    return new Order({
        date: order.date,
        status: order.status,
        username: order.username,
        email: order.email,
        phone_number: order.phone_number,
        list: order.list,
        amount: order.amount,
        }).save();
}

module.exports.findbyIdAndUpdate = (id, updateData) => {
    return new Order({'id':id}).save(updateData, {patch: true});
 }
 
module.exports.getOrdersByStatus = (status) => {
    return Order.where('status', status).fetchAll();
}