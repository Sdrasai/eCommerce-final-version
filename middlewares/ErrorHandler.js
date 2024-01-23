const { AppError } = require('../providers');
const { PrismaClientKnownRequestError } = require('@prisma/client');

const prismaErrorMapping = new Map()
    .set('P1000', 'DB Authentication Failed, username or password for DB is wrong!')
    .set('P1001', 'DB is not running, make sure your database is running on it\'s given port!')
    .set('P1002', 'DB connection was found but timed out!')
    .set('P1003', 'DB not found at path!')
    .set('P1008', 'Operation Timed out!')
    .set('P1009', 'DB already exists on the same port and adress!')
    .set('P1010', 'User Access Denied on DB!')
    .set('P1011', 'Error Opening a TLS connection!')
    .set('P1012', 'some kind of arguments like ({} or @{} ...) is missing!')
    .set('P1013', 'provided DB string is invalid!')
    .set('P1014', 'DB model does not exist!')
    .set('P1015', 'DB outdated version for prisma!')
    .set('P1016', 'raw query had a wrong number of parameters!')
    .set('P1017', 'server Closed the Connection!')
    .set('P2000', 'provided value for the column\'s name is too long!')
    .set('P2001', 'record searched with a where condition does not exist!')
    .set('P2002', 'unique constraint failed!')
    .set('P2003', 'foreign key constraint failed!')
    .set('P2004', 'some kind of constraint failed on DB!')
    .set('P2005', 'The value stored in the database for the field is invalid for the field\'s type')
    .set('P2006', 'value provided is Invalid!')
    .set('P2007', 'data validation Error on DB level')
    .set('P2008', 'failed to parse the query')
    .set('P2009', 'failed to validate the query')
    .set('P2010', 'raw query failed!')
    .set('P2011', 'null constraint violation!')
    .set('P2012', 'Missing a required value at path!')
    .set('P2013', 'Missing the required argument')
    .set('P2014', 'The change you are trying to make would violate the required relation')
    .set('P2015', 'related record could not be found!')
    .set('P2016', 'Query interpretation error')
    .set('P2017', 'The records for relation between the and models are not connected.')
    .set('P2018', 'he required connected records were not found')
    .set('P2019', 'Input error')
    .set('P2020', 'Value out of range for the type.')
    .set('P2021', 'table does not exist!')
    .set('P2022', 'column does not exist!')
    .set('P2023', 'Inconsistent column data')
    .set('P2024', 'Timed out fetching a new connection from the connection pool')
    .set('P2025', 'An operation failed because it depends on one or more records that were required but not found')
    .set('P2026', 'The current database provider doesn\'t support a feature that the query used')
    .set('P2027', 'Multiple errors occurred on the database during query execution')
    .set('P2028', 'transaction API Error')
    .set('P2030', 'Cannot find a fulltext index to use for the search')
    .set('P2033', 'A number used in the query does not fit into a 64 bit signed integer. Consider using BigInt as field type if you\'re trying to store large integers')
    .set('P5000', 'This request could not be understood by the server')
    .set('P5001', 'This request must be retried')
    .set('P5002', 'The datasource provided is invalid')
    .set('P5003', 'Requested resource does not exist')
    .set('P5006', 'Unknown server error')
    .set('P5007', 'Unauthorized, check your connection string')
    .set('P5008', 'Usage exceeded, retry again later')
    .set('P5009', 'Request timed out')
    .set('P5010', 'Cannot fetch data from service')
    .set('P5011', 'Request parameters are invalid.')

function globalErrorHandler(error, req, res, next){
    if (error instanceof AppError){
        error.statusCode = error.statusCode || 500;
        error.status = error.status || 'error';
        res.status(error.statusCode).send({
            status: error.statusCode,
            message: error.message,
            stack: error.stack.split('\n')[1]
        })
    } else if (error instanceof PrismaClientKnownRequestError){
        const errorMessage = {
            mode: 'DB prisma Error',
            code: error.code,
            message: prismaErrorMapping.get(error.code)
        }
        res.status(500).send(errorMessage);
    } else {
        res.status(500).send({msg: error.message, stack: error.stack});
    }
}

function asyncErrorHandler(func){
    return (req, res, next) => {
        func(req, res, next).catch(err => next(err));
    }
}

module.exports = {
    globalErrorHandler,
    asyncErrorHandler
}