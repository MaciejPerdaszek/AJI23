const bookshelf = require('../config/bookshelf');

const Status = bookshelf.Model.extend({
    tableName: 'status'
    })

module.exports.getAll = () => {
    return Status.fetchAll();
}