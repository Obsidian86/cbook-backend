const errorHandler = (error, req, res, next) =>{ 
    const sendError = {
        status: error.status || 500,
        error: error.message || "Something went wrong"
    }
    console.log(error);
    return( res.status(sendError.status).json({error: sendError}) ); 
} 
module.exports = errorHandler;