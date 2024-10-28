class ErrorResponse extends Error {  
    constructor(message, statusCode) {  
        super(message); // Call the parent constructor (Error)  

        this.statusCode = statusCode; // Custom property for the status code  
        Error.captureStackTrace(this, this.constructor); // Capture the stack trace  
    }  
}  

module.exports = ErrorResponse;