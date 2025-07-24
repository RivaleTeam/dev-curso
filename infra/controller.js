import { InternalServerError, MethodNotAllowedError, ConflictError } from "./erros.js";

function onNoMatchHandler(request, response) {
  const method = request.method;
  const allowedMethods = ["GET"];  
  
    const MethodNotAllowed = new MethodNotAllowedError({ 
        cause: null, 
        method: method, 
        allowedMethods 
    });

    response.status(MethodNotAllowed.statusCode).json(MethodNotAllowed);
}

function onErrorHandler(error, request, response) {

    if (
        error instanceof ConflictError || error instanceof UnauthorizedError) {
        return response.status(error.statusCode).json(error);
    }  

    const onError = new InternalServerError({
        cause: error,
    });

    response.status(onError.statusCode).json(onError)
}

const controller = {
    ErrorHandler: {
        onNoMatch: onNoMatchHandler,
        onError: onErrorHandler
    }
}

export default controller;