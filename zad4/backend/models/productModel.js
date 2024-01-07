const bookshelf = require('../config/bookshelf');
const Category = require('./categoryModel');

const Product = bookshelf.Model.extend({
   tableName: 'products',
   category: function() {
      return this.belongsTo(Category, 'idcategory');
   }
})

module.exports = bookshelf.model('Product', Product);

module.exports.getAll = async () => {
   try {
      return await Product.fetchAll({withRelated: ['category']});
   } catch (error) {
      console.log("No products found: " + error.message);
      return null;
   }
}

module.exports.getById = async (id) => {
   try {
      const p = await new Product({'id':id}).fetch({withRelated: ['category']});
      return p;
   } catch (error) {
      console.log("No product found: " + error.message);
      return null;
   }
}

module.exports.create = async (product) => {
   try { 
      const category = await Category.getById(product.idcategory);
  
   const p = new Product({
      name: product.name,
      description: product.description,
      price: product.price,
      weight: product.weight,
      idcategory: product.idcategory,
  });
  await p.save();
  return p.id;
   } catch (error) {
      console.log("Error while creating product: " + error.message);
      return null;
   }
}

module.exports.update = async (id, updateData) => {
   try {
      const product = await Product.getById(id);
      await product.save(updateData);
      return id;
   } catch (error) {
      console.log("Error while updating product: " + error.message);
      return null;
   }
}

