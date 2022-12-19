
exports.errorHandling = ((err, req, res, next) => {
    let statusCode = err.status || 500
    res.status(statusCode)
    res.json({
        error: {
            status: statusCode,
            message: err.message
        }
    });
});