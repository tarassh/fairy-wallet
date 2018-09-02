import _ from 'lodash';
import { STATUS_CODES } from 'http';

function isJSON(message) {
  return !_.isError(_.attempt(JSON.parse, message));
}

function parseError (error) {
  if (!error) return null;

  const statusCode = error.status || error.statusCode;
  if (statusCode) {
    return translateStatusCode(statusCode);
  }

  const { message } = error;
  let errorMessage = "Unknown error!";
  if (message) {
    if (isJSON(message)){
      const errorObj = JSON.parse(error);
      if (errorObj.message)
        errorMessage = errorObj.message;
    } 
    else {
      errorMessage = message;
    }
  }

  return errorMessage;
}

function translateStatusCode (statusCode) {
  if (statusCode)
    return STATUS_CODES[statusCode];
}

export default {
  parseError
}