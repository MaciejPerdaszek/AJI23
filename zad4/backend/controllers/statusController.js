const Status = require('../models/statusModel');

exports.getStatuses = (req, res) => {
    Status.getAll().then(
        function(allStatuses) {
            res.json(allStatuses);
        }
    );
}