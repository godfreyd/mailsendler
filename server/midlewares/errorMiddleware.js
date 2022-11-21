const ApiError = require('../exceptions/apiError');

module.exports = function(err, _req, res, _next) {
    console.log(err);

    if(err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors});
    }
    return res.status(500).json({message: 'Unexpected error'});
}