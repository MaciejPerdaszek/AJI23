const bookshelf = require('../config/bookshelf');

const OrderProduct = bookshelf.Model.extend({
    tableName: 'order_products',
    order: function() {
        return this.belongsTo(Order, 'order_id');
    },
    product: function() {
        return this.belongsTo(Product, 'product_id');
    }
});

module.exports = bookshelf.model('OrderProduct', OrderProduct);

module.exports.getAll = async () => {
    try {
        return await OrderProduct.fetchAll();
    } catch (error) {
        console.log("No order products found");
        return null;
    }
}

module.exports.create = async (orderProduct) => { 
    try {
        const op = new OrderProduct({
            order_id: orderProduct.order_id,
            product_id: orderProduct.product_id,
            amount: orderProduct.amount,
            });
        await op.save();
        return op;
    } catch (error) {
        console.log("Error while creating order product: " + error.message);
        return null;
    }
}

module.exports.getByOrderId = async (order_id) => {
    try {
        return await new OrderProduct({'order_id':order_id}).fetchAll();
    } catch (error) {
        console.log("No order products found: " + error.message);
        return null;
    }
 }

module.exports.addProductToOrder = async (order_id, product_id, amount) => {
    try {
        const op = new OrderProduct({
            order_id: order_id,
            product_id: product_id,
            amount: amount,
            });
        await op.save();
        return op.id;
    } catch (error) {
        console.log("Error while creating order product: " + error.message);
        return null;
    }
}

module.exports.removeProductFromOrder = async (order_id, product_id) => {
    try {
        const op = new OrderProduct({'order_id':order_id, 'product_id':product_id});
        await op.destroy();
        return op.id;
    } catch (error) {
        console.log("Error while deleting order product: " + error.message);
        return null;
    }
 }