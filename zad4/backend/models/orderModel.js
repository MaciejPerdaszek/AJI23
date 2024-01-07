const bookshelf = require('../config/bookshelf');
const OrderProduct = require('./orderProductModel');

const Order = bookshelf.Model.extend({
    tableName: 'orders',
    orderProducts: function() {
        return this.hasMany(OrderProduct, 'order_id');
    }});

module.exports = bookshelf.model('Order', Order);

module.exports.getAll = async () => {
    try {
        return await Order.fetchAll({withRelated: ['orderProducts']});
    } catch (error) {
        console.log("No orders found: " + error.message);
        return null;
    }
}

module.exports.getById = async (id) => {
    try {
        return await new Order({'id':id}).fetch({withRelated: ['orderProducts']});
    } catch (error) {
        console.log("No order found: " + error.message);
        return null;
    }
}

module.exports.create = async (order) => { 
    try {
    const o = new Order({
        date: order.date,
        status: order.status,
        username: order.username,
        email: order.email,
        phone_number: order.phone_number,
        amount: order.amount,
        });
        await o.save();

    for (let op of order.products) {
        await o.related('orderProducts').create({
            product_id: op.product_id,
            amount: op.amount,
        
        });
    }
    return o.id;
} catch (error) {
    console.log("Error while creating order: " + error.message);
    return null;
}
}



 module.exports.update = async (id, updateData) => {
    try {
        const order = await Order.getById(id);
        let orderProducts = order.related('orderProducts');
        for (let op of orderProducts) {
            await op.destroy();
        }
        orderProducts = updateData.products;
        delete updateData.products;
        await order.save(updateData);
        for (let op of orderProducts) {
            await order.related('orderProducts').create({
                product_id: op.product_id,
                amount: op.amount,
            });
        }
        return id;
    }
    catch (error) {
        console.log("Error while updating order: " + error.message);
        return null;
    }
 }
 
module.exports.getOrdersByStatus = async (status) => {
    try {
        return await Order.where('status', status).fetchAll();
    } catch (error) {
        console.log("No orders found: " + error.message);
        return null;
    }
}