const bookshelf = require('../config/bookshelf');
const Product = require('./productModel');

const Category = bookshelf.Model.extend({
    tableName: 'categories',
    idAttribute: 'idcategory',
    products: function() {
        return this.hasMany(Product, 'idcategory');
    }
    });

module.exports = bookshelf.model('Category', Category);


module.exports.getAll = async () => {
    try {
        return await Category.fetchAll();
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

module.exports.getById = async (id) => {
    try {
        return await new Category({'idcategory': id}).fetch();
    } catch (error) {
        console.log(error.message);
        return null;
    }
}