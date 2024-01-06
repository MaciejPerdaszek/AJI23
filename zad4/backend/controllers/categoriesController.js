const Category = require('../models/catetoryModel');

exports.getCategories = (req, res) => {
    Category.getAll().then(
        function(allCategories) {
            res.json(allCategories);
        }
    );
}