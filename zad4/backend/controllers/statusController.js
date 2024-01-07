const {StatusCodes} = require('http-status-codes');

exports.getStatuses = (req, res) => {
    res.status(StatusCodes.OK).json(statuses);
}
exports.statuses = {
    'NEW': 1,
    'PAID': 2,
    'SENT': 3,
    'DELIVERED': 4,
    'CANCELED': 5
}