const Category = require('../models/categoryModel');
const {StatusCodes} = require('http-status-codes');

exports.getCategories = (req, res) => {
    Category.getAll().then(
        function(allCategories) {
            res.status(StatusCodes.OK).json(allCategories);
        }
    );
}