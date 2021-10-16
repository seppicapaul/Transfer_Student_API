const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class TransactionsController {
    constructor() {
        console.log('Constructor of TransactionsController is called.');
    }

    async allTransactions(ctx) {
        console.log('transactions all transactions called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT count(*)
                       AS numberOfTrans
                        FROM 
                            transactions
                        WHERE 
                            cycleID = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.cycleID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in TransactionsController::transactionWithCycleID", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async transactionWithTransactionID(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            transactions
                        WHERE 
                            transactionID = ?
                        ORDER BY transactionName
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.transactionID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in TransactionsController::transactionWithTransactionID", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    /*async transactionWithCycleID(ctx) {

    }*/

    async transactionWithAccountID(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            transactions t,
                            accounts a
                        WHERE 
                            t.accountID = a.accountID
                            AND
                            t.cycleID = ?
                            AND
                            t.accountID = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.cycleID, ctx.params.accountID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in TransactionsController::transactionWithAccountID", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async transactionWithoutRouteID(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            transactions
                        WHERE 
                            cycleID = ?
                        ORDER BY routeID
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.cycleID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in TransactionsController::transactionWithTransactionID", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async transactionWithRouteID(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            transactions t,
                            routes r
                        WHERE 
                            t.routeID = r.routeID
                            AND
                            t.cycleID = ?
                            AND
                            t.routeID = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.cycleID, ctx.params.routeID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in TransactionsController::transactionWithTransactionID", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async transactionWithMarketID(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            transactions t,
                            markets m
                        WHERE 
                            t.marketID = m.marketID
                            AND
                            t.cycleID = ?
                            AND
                            t.marketID = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.cycleID, ctx.params.marketID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in TransactionsController::transactionWithTransactionID", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }
}

module.exports = TransactionsController;
