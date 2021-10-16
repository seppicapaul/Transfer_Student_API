const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class MarketsController {
    constructor() {
        console.log('Constructor of MarketsController is called.');
    }

    async allMarkets(ctx) {
        console.log('markets all markets called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            markets
                        ORDER BY marketName
                        `;
            dbConnection.query({
                sql: query,
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in MarketsController::allMarkets", error);
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

    async marketWithMarketID(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            markets
                        WHERE 
                            marketID = ?
                        ORDER BY marketName
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.marketID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in MarketsController::marketWithMarketID", error);
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

module.exports = MarketsController;
