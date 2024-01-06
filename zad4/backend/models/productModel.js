const bookshelf = require('../config/bookshelf');

const Product = bookshelf.Model.extend({
   tableName: 'products'
})

module.exports.getAll = () => {
   return Product.fetchAll();
}

module.exports.getById = (id) => {
   return new Product({'id':id}).fetch();
}

module.exports.create = (product) => {
   return new Product({
      name: product.name,
      description: product.description,
      price: product.price,
      weight: product.weight,
      idcategory: product.idcategory,
  }).save();
};

module.exports.findbyIdAndUpdate = (id, updateData) => {
   return new Product({'id':id}).save(updateData, {patch: true});
}

