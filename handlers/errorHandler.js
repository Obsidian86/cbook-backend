const errorHandler = (error, req, res, next) =>{ 
    const sendError = {
        status: error.status || 500,
        error: error.message || "Something went wrong"
    } 
    return( res.status(sendError.status).json(sendError) ); 
}

module.exports = errorHandler;